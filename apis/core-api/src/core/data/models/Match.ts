import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { MatchScoreTypesEnum, MatchStatusesEnum, WinnerEnum } from '@ultras/utils';

import db from 'core/data/models';
import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Team } from 'core/data/models/Team';
import { Venue } from 'core/data/models/Venue';
import { League } from 'core/data/models/League';

export interface MatchAttributes {
  id: number;
  dateTime: string;
  teamHomeId: number;
  teamAwayId: number;
  venueId: number;
  leagueId: number;
  status: MatchStatusesEnum;
  winner: WinnerEnum;
  goalsHome: null | number;
  goalsAway: null | number;
  elapsedTime: number;
  dataRapidId: number;
}

export type MatchCreationAttributes = Optional<
  MatchAttributes,
  'id' | 'goalsHome' | 'goalsAway' | 'elapsedTime'
>;

export class Match
  extends Model<MatchAttributes, MatchCreationAttributes>
  implements MatchAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public dateTime!: string;
  public teamHomeId!: number;
  public teamAwayId!: number;
  public venueId!: number;
  public leagueId!: number;
  public status!: MatchStatusesEnum;
  public winner!: WinnerEnum;
  public goalsHome!: number;
  public goalsAway!: number;
  public elapsedTime!: number;
  public dataRapidId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly teamHome?: Team;
  public readonly teamAway?: Team;
  public readonly venue?: Venue;
  public readonly league?: League;

  // associations

  static associate(models: any) {
    Match.belongsTo(models.Team, {
      as: resources.TEAM.ALIAS.SINGULAR + 'Home',
      foreignKey: 'teamHomeId',
    });

    Match.belongsTo(models.Team, {
      as: resources.TEAM.ALIAS.SINGULAR + 'Away',
      foreignKey: 'teamAwayId',
    });

    Match.belongsTo(models.Venue, {
      as: resources.VENUE.ALIAS.SINGULAR,
      foreignKey: 'venueId',
    });

    Match.belongsTo(models.League, {
      as: resources.LEAGUE.ALIAS.SINGULAR,
      foreignKey: 'leagueId',
    });

    Match.hasMany(models.Score, {
      as: resources.SCORE.ALIAS.PLURAL,
      foreignKey: 'matchId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Match => {
  Match.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      teamHomeId: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: resources.TEAM.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      teamAwayId: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: resources.TEAM.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      venueId: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: resources.VENUE.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      leagueId: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: resources.LEAGUE.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM({
          values: [
            MatchStatusesEnum.preMatch,
            MatchStatusesEnum.live,
            MatchStatusesEnum.halfTime,
            MatchStatusesEnum.extraTime,
            MatchStatusesEnum.penalties,
            MatchStatusesEnum.finished,
            MatchStatusesEnum.postponed,
            MatchStatusesEnum.canceled,
          ],
        }),
        allowNull: false,
        defaultValue: MatchStatusesEnum.preMatch,
      },
      winner: {
        type: DataTypes.ENUM({
          values: [WinnerEnum.draw, WinnerEnum.home, WinnerEnum.away],
        }),
        allowNull: false,
      },
      goalsHome: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      goalsAway: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      elapsedTime: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      dataRapidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: resources.MATCH.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      hooks: {
        afterBulkCreate: (instances, options) => {
          // create Score row with default data for new Match.
          const scores = instances.map((instance: Match) => ({
            matchId: instance.getDataValue('id'),
            type: MatchScoreTypesEnum.fullTime,
          }));

          db.Score.bulkCreate(scores);
        },
        afterCreate: (instance, options) => {
          // create Score row with default data for new Match.
          db.Score.create({
            matchId: instance.getDataValue('id'),
            type: MatchScoreTypesEnum.fullTime,
          });
        },
      },
      sequelize,
    }
  );

  return Match;
};
