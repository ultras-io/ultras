import { Transaction } from 'sequelize';
import { MatchViewModel } from '@ultras/view-models';
import { OrderEnum, parseMatchStatus, WinnerEnum } from '@ultras/utils';
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

import BaseService, { RelationGroupType } from './BaseService';
import TeamService from './TeamService';
import VenueService from './VenueService';
import LeagueService from './LeagueService';

export interface IMatchesListParams {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  leagueId?: ResourceIdentifier;
  venueId?: ResourceIdentifier;
  teamId?: ResourceIdentifier;
  teamHomeId?: ResourceIdentifier;
  teamAwayId?: ResourceIdentifier;
  userId?: ResourceIdentifier;
}

export interface IMatchByIdParams {
  id: ResourceIdentifier;
  userId?: ResourceIdentifier;
}

export const defaultRelations: RelationGroupType = [
  'team',
  'team.city',
  'team.country',
  'venue',
  'venue.city',
  'venue.country',
  'league',
  'league.country',
];

class MatchService extends BaseService {
  protected static includeRelations(
    relations: RelationGroupType = defaultRelations,
    args: any = {}
  ) {
    relations = relations || defaultRelations;
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'team')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        team: ['city', 'country', 'city.country'],
      });

      includeRelations.push({
        model: db.Team,
        as: resources.TEAM.ALIAS.SINGULAR + 'Home',
        ...TeamService.getIncludeRelations(relationsHierarchy),
      });

      includeRelations.push({
        model: db.Team,
        as: resources.TEAM.ALIAS.SINGULAR + 'Away',
        ...TeamService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'venue')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        venue: ['city', 'country', 'city.country'],
      });

      includeRelations.push({
        model: db.Venue,
        as: resources.VENUE.ALIAS.SINGULAR,
        ...VenueService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'league')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        league: ['country'],
      });

      includeRelations.push({
        model: db.League,
        as: resources.LEAGUE.ALIAS.SINGULAR,
        ...LeagueService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'score')) {
      includeRelations.push({
        model: db.Score,
        as: resources.SCORE.ALIAS.PLURAL,
      });
    }

    const attributes = [];

    if (args.userId) {
      attributes.push([
        db.Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM "${resources.ULTRAS_CORE}"."${resources.CATCH.RELATION}"
            WHERE (
              "deletedAt" IS NULL AND
              "userId" = ${args.userId} AND
              "matchId" = "${args.catchesFrom || resources.MATCH.RELATION}"."id"
            )
          )
        `),
        'caught',
      ]);
    }

    return {
      attributes: {
        include: attributes,
        // exclude: ['teamHomeId', 'teamAwayId', 'venueId', 'leagueId'],
      },
      include: includeRelations,
    };
  }

  /**
   * Get matches by provided filter data and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<IMatchesListParams>
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

    let moreQueryOptions: any = {
      ...this.includeRelations(null, { userId: params.userId }),
    };

    if (params.search) {
      this.queryAppend(query, db.Sequelize.Op.or, [
        db.Sequelize.literal(`"teamHome"."name" ILIKE '%${params.search}%'`),
        db.Sequelize.literal(`"teamAway"."name" ILIKE '%${params.search}%'`),
      ]);

      moreQueryOptions = {
        subQuery: false,
      };
    }

    return this.findAndCountAll(db.Match, query, params, true, moreQueryOptions);
  }

  /**
   * Get match by their ID.
   */
  static async getById(params: IMatchByIdParams): ServiceByIdResultType<any> {
    return this.findById(db.Match, params.id, {
      ...this.includeRelations(null, { userId: params.userId }),
    });
  }

  private static teamsById: Record<number, any> = {};
  private static leaguesById: Record<number, any> = {};
  private static venuesById: Record<number, any> = {};

  /**
   * Inject matches from Rapid API by date.
   * @important matches date is required.
   */
  static async injectByDate(date: string) {
    const {
      body: { response },
    } = await injectMatches.byDate(date);

    // eslint-disable-next-line no-console
    console.log(`>>> Date: ${date}, Matches: ${response.length}`);
    await this.injectMatchesToDatabase(response);
  }

  /**
   * Inject matches from Rapid API by season.
   * @important matches date is required.
   */
  static async injectBySeason(season: string) {
    const leagues = [
      { id: 2, name: 'UEFA Champions League' },
      { id: 39, name: 'Premier League' },
      { id: 78, name: 'Bundesliga 1' },
      { id: 135, name: 'Serie A' },
      { id: 140, name: 'La Liga' },
    ];

    for (const league of leagues) {
      const {
        body: { response },
      } = await injectMatches.bySeason(season, league.id);

      // eslint-disable-next-line no-console
      console.log(
        `>>> Season: ${season}, League: ${league.name}, Matches: ${response.length}`
      );

      await this.injectMatchesToDatabase(response);
    }
  }

  private static async injectMatchesToDatabase(response: any[]) {
    let records: MatchCreationAttributes[] = [];
    let iteration = 0;

    for (const responseItem of response) {
      const item: RapidApiMatch = responseItem as RapidApiMatch;
      if (
        !item.fixture.venue.id ||
        !item.league.id ||
        !item.teams.home.id ||
        !item.teams.away.id
      ) {
        continue;
      }

      let venue = this.venuesById[item.fixture.venue.id];
      if (!venue) {
        venue = await db.Venue.findOne({
          attributes: ['dataRapidId', 'id'],
          where: {
            dataRapidId: item.fixture.venue.id,
          },
        });
        if (!venue) {
          continue;
        }
      }

      let league = this.leaguesById[item.league.id];
      if (!league) {
        league = await db.League.findOne({
          attributes: ['dataRapidId', 'id'],
          where: {
            dataRapidId: item.league.id,
          },
        });
        if (!league) {
          continue;
        }
      }

      let teamHome = this.teamsById[item.teams.home.id];
      if (!teamHome) {
        teamHome = await db.Team.findOne({
          attributes: ['dataRapidId', 'id'],
          where: {
            dataRapidId: item.teams.home.id,
          },
        });
        if (!teamHome) {
          continue;
        }
      }

      let teamAway = this.teamsById[item.teams.away.id];
      if (!teamAway) {
        teamAway = await db.Team.findOne({
          attributes: ['dataRapidId', 'id'],
          where: {
            dataRapidId: item.teams.away.id,
          },
        });
        if (!teamAway) {
          continue;
        }
      }

      let matchWinner: WinnerEnum = WinnerEnum.draw;
      if (item.teams.home.winner) {
        matchWinner = WinnerEnum.home;
      } else if (item.teams.away.winner) {
        matchWinner = WinnerEnum.away;
      }

      const rowData = {
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
      };

      const existing = await db.Match.findOne({
        where: { dataRapidId: item.fixture.id },
      });

      if (existing) {
        for (const key in rowData) {
          existing.setDataValue(key, (rowData as any)[key]);
        }

        await existing.save();
        continue;
      }

      records.push(rowData);
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

  /**
   * Increment catches count of match.
   */
  static async incrementCatches(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Match.increment('catchesCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Decrement catches count of match.
   */
  static async decrementCatches(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Match.decrement('catchesCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Increment comments count of match.
   */
  static async incrementComments(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Match.increment('commentsCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Decrement comments count of match.
   */
  static async decrementComments(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Match.decrement('commentsCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }
}

export default MatchService;
