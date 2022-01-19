import db from 'core/data/models';
import { parseMatchStatus, OrderEnum, WinnerEnum } from '@ultras/utils';

import { MatchCreationAttributes } from 'core/data/models/Match';
import { SomethingWentWrong } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectMatches, { RapidApiMatch } from 'core/data/inject-scripts/injectMatches';
import resources from 'core/data/lcp';

import {
  GetAllMatchesActionParams,
  GetAllMatchesActionResult,
  InjectMatchesDataResult,
  GetMatchByIdResult,
} from './types';

class MatchController {
  private static includeRelations = {
    attributes: {
      exclude: ['teamHomeId', 'teamAwayId', 'venueId', 'leagueId'],
    },
    include: [
      {
        model: db.Team,
        as: resources.TEAM.ALIAS.SINGULAR + 'Home',
      },
      {
        model: db.Team,
        as: resources.TEAM.ALIAS.SINGULAR + 'Away',
      },
      {
        model: db.Venue,
        as: resources.VENUE.ALIAS.SINGULAR,
      },
      {
        model: db.League,
        as: resources.LEAGUE.ALIAS.SINGULAR,
      },
      {
        model: db.Score,
        as: resources.SCORE.ALIAS.PLURAL,
      },
    ],
  };

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'id',
    order = OrderEnum.asc,
    dateFrom,
    dateTo,
    leagueId,
    teamId,
  }: GetAllMatchesActionParams): Promise<GetAllMatchesActionResult> {
    const query: any = {
      [db.Sequelize.Op.and]: [],
    };

    if (dateFrom && dateTo) {
      query[db.Sequelize.Op.and].push({
        dateTime: {
          [db.Sequelize.Op.between]: [dateFrom, dateTo],
        },
      });
    }

    if (leagueId) {
      query[db.Sequelize.Op.and].push({
        leagueId: {
          [db.Sequelize.Op.eq]: leagueId,
        },
      });
    }

    if (teamId) {
      query[db.Sequelize.Op.and].push({
        teamId: {
          [db.Sequelize.Op.eq]: teamId,
        },
      });
    }

    const { rows, count } = await db.Match.findAndCountAll({
      limit,
      offset,
      where: query,
      order: [[orderAttr, order]],
      ...this.includeRelations,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetMatchByIdResult> {
    const match = await db.Match.findByPk(id, {
      ...this.includeRelations,
    });

    return {
      data: match,
    };
  }

  /**
   * used to development purposes
   */
  static async inject(date: string): Promise<InjectMatchesDataResult> {
    // inject here
    try {
      const {
        body: { response },
      } = await injectMatches(date);

      const records: MatchCreationAttributes[] = [];
      for (const responseItem of response) {
        const item: RapidApiMatch = responseItem as RapidApiMatch;

        const teams = await db.Team.findAll({
          where: {
            dataRapidId: {
              [db.Sequelize.Op.in]: [item.teams.home.id, item.teams.away.id],
            },
          },
          attributes: ['dataRapidId', 'id'],
          limit: 2,
        });

        const venue = await db.Venue.findOne({
          where: {
            dataRapidId: item.fixture.venue.id,
          },
          attributes: ['dataRapidId', 'id'],
        });

        if (!venue) {
          continue;
        }

        const league = await db.League.findOne({
          where: {
            dataRapidId: item.league.id,
          },
          attributes: ['dataRapidId', 'id'],
        });

        if (!league) {
          continue;
        }

        const { teamHome, teamAway } = teams.reduce(
          (acc: any, team: any) => {
            if (team.getDataValue('dataRapidId') == item.teams.home.id) {
              acc.teamHome = team;
            } else if (team.getDataValue('dataRapidId') == item.teams.away.id) {
              acc.teamAway = team;
            }

            return acc;
          },
          {
            teamHome: null,
            teamAway: null,
          }
        );

        if (null == teamHome || null == teamAway) {
          continue;
        }

        records.push({
          dateTime: item.fixture.date,
          teamHomeId: teamHome.getDataValue('id'),
          teamAwayId: teamAway.getDataValue('id'),
          venueId: venue.getDataValue('id'),
          leagueId: league.getDataValue('id'),
          status: parseMatchStatus(item.fixture.status.short),
          winner: WinnerEnum.draw,
          goalsHome: item.goals.home,
          goalsAway: item.goals.away,
          elapsedTime: item.fixture.status.elapsed,
          dataRapidId: item.fixture.id,
        });
      }

      await db.Match.bulkCreate(records);

      return { data: { success: true } };
    } catch (e: any) {
      throw new SomethingWentWrong({
        message: "Api throws error or couldn't insert",
        originalMessage: e?.message,
      });
    }
  }
}

export default MatchController;
