import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { MatchStatusesEnum, WinnerEnum } from '@ultras/utils';

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
  dataRapidId: number;
}

export type MatchCreationAttributes = Optional<MatchAttributes, 'id'>;

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
      as: resources.TEAM.ALIAS.SINGULAR,
      foreignKey: 'teamHomeId',
    });

    Match.belongsTo(models.Team, {
      as: resources.TEAM.ALIAS.SINGULAR + 'Home',
      foreignKey: 'teamAwayId',
    });

    Match.belongsTo(models.Venue, {
      as: resources.VENUE.ALIAS.SINGULAR + 'Away',
      foreignKey: 'venueId',
    });

    Match.belongsTo(models.League, {
      as: resources.LEAGUE.ALIAS.SINGULAR,
      foreignKey: 'leagueId',
    });

    Match.hasOne(models.Score, {
      as: resources.SCORE.ALIAS.SINGULAR,
      foreignKey: 'matchId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Match => {
  Match.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      dateTime: {
        type: new DataTypes.DATE(),
        allowNull: false,
      },
      teamHomeId: {
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.ENUM({
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
        type: new DataTypes.ENUM({
          values: [WinnerEnum.draw, WinnerEnum.home, WinnerEnum.away],
        }),
        allowNull: false,
      },
      dataRapidId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
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
          }));

          db.Score.bulkCreate(scores);
        },
        afterCreate: (instance, options) => {
          // create Score row with default data for new Match.
          db.Score.create({
            matchId: instance.getDataValue('id'),
          });
        },
      },
      sequelize,
    }
  );

  return Match;
};
