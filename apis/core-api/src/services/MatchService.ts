import { parseMatchStatus, WinnerEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  DbIdentifier,
} from 'types';

import BaseService from 'base/BaseService';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { MatchAttributes, MatchCreationAttributes } from 'core/data/models/Match';
import injectMatches, { RapidApiMatch } from 'core/data/inject-scripts/injectMatches';

export interface MatchesListParamsInterface {
  dateFrom?: string;
  dateTo?: string;
  leagueId?: DbIdentifier;
  venueId?: DbIdentifier;
  teamId?: DbIdentifier;
  teamHomeId?: DbIdentifier;
  teamAwayId?: DbIdentifier;
}

class MatchService extends BaseService {
  protected static includeRelations() {
    return {
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
  }

  static async getAll(
    params: ServiceListParamsType<MatchesListParamsInterface>
  ): ServiceListResultType<MatchAttributes> {
    const query: any = this.queryInit();

    if (params.dateFrom && params.dateTo) {
      this.queryAppend(query, 'dateTime', {
        [db.Sequelize.Op.between]: [params.dateFrom, params.dateTo],
      });
    }

    if (params.leagueId) {
      this.queryAppend(query, 'leagueId', {
        [db.Sequelize.Op.eq]: params.leagueId,
      });
    }

    if (params.venueId) {
      this.queryAppend(query, 'venueId', {
        [db.Sequelize.Op.eq]: params.venueId,
      });
    }

    if (params.teamHomeId) {
      this.queryAppend(query, 'teamHomeId', {
        [db.Sequelize.Op.eq]: params.teamHomeId,
      });
    }

    if (params.teamAwayId) {
      this.queryAppend(query, 'teamAwayId', {
        [db.Sequelize.Op.eq]: params.teamAwayId,
      });
    }

    if (params.teamId) {
      this.queryAppend(query, db.Sequelize.Op.or, [
        {
          teamHomeId: {
            [db.Sequelize.Op.eq]: params.teamId,
          },
        },
        {
          teamAwayId: {
            [db.Sequelize.Op.eq]: params.teamId,
          },
        },
      ]);
    }

    return this.findAndCountAll(db.Match, query, params);
  }

  static async getById(id: DbIdentifier): ServiceByIdResultType<MatchAttributes> {
    return this.findById(db.Match, id);
  }

  static async inject(date: string) {
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
  }
}

export default MatchService;
