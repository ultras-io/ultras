import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Match } from 'core/data/models/Match';

export interface ScoreAttributes {
  id: number;
  matchId: number;
  teamHomeScore: number;
  teamHomePenalties: number;
  teamAwayScore: number;
  teamAwayPenalties: number;
}

export type ScoreCreationAttributes = Optional<
  ScoreAttributes,
  'id' | 'teamHomeScore' | 'teamHomePenalties' | 'teamAwayScore' | 'teamAwayPenalties'
>;

export class Score
  extends Model<ScoreAttributes, ScoreCreationAttributes>
  implements ScoreAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public matchId!: number;
  public teamHomeScore!: number;
  public teamHomePenalties!: number;
  public teamAwayScore!: number;
  public teamAwayPenalties!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly match?: Match;

  // associations

  static associate(models: any) {
    Score.belongsTo(models.Match, {
      as: resources.MATCH.ALIAS.SINGULAR,
      foreignKey: 'matchId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Score => {
  Score.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      matchId: {
        type: new DataTypes.INTEGER(),
        references: {
          model: {
            tableName: resources.MATCH.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      teamHomeScore: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
      teamHomePenalties: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
      teamAwayScore: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
      teamAwayPenalties: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: resources.SCORE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return Score;
};
