
import fs from "fs";
import db from 'core/data/models';
import { OrderEnum, WinnerEnum } from '@ultras/utils';

import { MatchCreationAttributes } from 'core/data/models/Match';
import { SomethingWentWrong } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import injectMatches, {
  statusAdapter,
  RapidApiMatch,
} from 'core/data/inject-scripts/injectMatches';

import {
  GetAllMatchesActionParams,
  GetAllMatchesActionResult,
  InjectMatchesDataResult,
  GetMatchByIdResult,
} from './types';

class MatchController {
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
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: number): Promise<GetMatchByIdResult> {
    const match = await db.Match.findByPk(id);

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
          status: statusAdapter[item.fixture.status.short],
          winner: WinnerEnum.draw,
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
