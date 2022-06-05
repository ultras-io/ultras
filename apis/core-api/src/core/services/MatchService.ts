import { MatchViewModel } from '@ultras/view-models';
import { parseMatchStatus, WinnerEnum } from '@ultras/utils';
import {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceByIdResultType,
  ResourceIdentifier,
} from 'types';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { MatchCreationAttributes } from 'core/data/models/Match';
import injectMatches, { RapidApiMatch } from 'core/data/inject-scripts/injectMatches';

import BaseService from './BaseService';
import TeamService from './TeamService';
import VenueService from './VenueService';
import LeagueService from './LeagueService';

export interface MatchesListParamsInterface {
  dateFrom?: string;
  dateTo?: string;
  leagueId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  teamHomeId?: ResourceIdentifier;
  teamAwayId?: ResourceIdentifier;
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
          ...TeamService.getIncludeRelations(),
        },
        {
          model: db.Team,
          as: resources.TEAM.ALIAS.SINGULAR + 'Away',
          ...TeamService.getIncludeRelations(),
        },
        {
          model: db.Venue,
          as: resources.VENUE.ALIAS.SINGULAR,
          ...VenueService.getIncludeRelations(),
        },
        {
          model: db.League,
          as: resources.LEAGUE.ALIAS.SINGULAR,
          ...LeagueService.getIncludeRelations(),
        },
        {
          model: db.Score,
          as: resources.SCORE.ALIAS.PLURAL,
        },
      ],
    };
  }

  /**
   * Get matches by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<MatchesListParamsInterface>
  ): ServiceListResultType<MatchViewModel> {
    const query: any = this.queryInit();

    if (params.dateFrom && params.dateTo) {
      this.queryAppend(query, 'dateTime', {
        [db.Sequelize.Op.between]: [params.dateFrom, params.dateTo],
      });
    }

    if (params.leagueId) {
      this.queryArrayOrSingle(query, 'leagueId', params.leagueId);
    }

    if (params.venueId) {
      this.queryArrayOrSingle(query, 'venueId', params.venueId);
    }

    if (params.teamHomeId) {
      this.queryArrayOrSingle(query, 'teamHomeId', params.teamHomeId);
    }

    if (params.teamAwayId) {
      this.queryArrayOrSingle(query, 'teamAwayId', params.teamAwayId);
    }

    if (params.teamId) {
      const condition = this.getCondition(params.teamId);

      this.queryAppend(query, db.Sequelize.Op.or, [
        {
          teamHomeId: condition,
        },
        {
          teamAwayId: condition,
        },
      ]);
    }

    return this.findAndCountAll(db.Match, query, params);
  }

  /**
   * Get match by their ID.
   */
  static async getById(id: ResourceIdentifier): ServiceByIdResultType<MatchViewModel> {
    return this.findById(db.Match, id);
  }

  /**
   * Inject data from Rapid API.
   * @important matches date is required.
   */
  static async inject(date: string) {
    const {
      body: { response },
    } = await injectMatches(date);

    let records: MatchCreationAttributes[] = [];
    let iteration = 0;

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

      if (teams.length != 2) {
        continue;
      }

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

      if (!teamHome || !teamAway) {
        continue;
      }

      let matchWinner: WinnerEnum = WinnerEnum.draw;
      if (item.teams.home.winner) {
        matchWinner = WinnerEnum.home;
      } else if (item.teams.away.winner) {
        matchWinner = WinnerEnum.away;
      }

      records.push({
        dateTime: item.fixture.date,
        teamHomeId: teamHome.getDataValue('id'),
        teamAwayId: teamAway.getDataValue('id'),
        venueId: venue.getDataValue('id'),
        leagueId: league.getDataValue('id'),
        status: parseMatchStatus(item.fixture.status.short),
        winner: matchWinner,
        goalsHome: item.goals.home,
        goalsAway: item.goals.away,
        elapsedTime: item.fixture.status.elapsed,
        dataRapidId: item.fixture.id,
      });

      if (records.length != 0 && ++iteration % 20 == 0) {
        await db.Match.bulkCreate(records, {
          ignoreDuplicates: true,
        });
        records = [];
      }
    }

    if (records.length != 0) {
      await db.Match.bulkCreate(records, {
        ignoreDuplicates: true,
      });
    }
  }
}

export default MatchService;
