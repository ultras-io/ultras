import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { DbIdentifier } from 'types';
import { MatchScoreTypesEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Match } from 'core/data/models/Match';

export interface ScoreAttributes {
  id: DbIdentifier;
  matchId: DbIdentifier;
  type: MatchScoreTypesEnum;
  home: number;
  away: number;
}

export type ScoreCreationAttributes = Optional<
  ScoreAttributes,
  'id' | 'type' | 'home' | 'away'
>;

export class Score
  extends Model<ScoreAttributes, ScoreCreationAttributes>
  implements ScoreAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: DbIdentifier;
  public matchId!: DbIdentifier;
  public type!: MatchScoreTypesEnum;
  public home!: number;
  public away!: number;

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
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      matchId: {
        type: DataTypes.BIGINT,
        references: {
          model: {
            tableName: resources.MATCH.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        type: DataTypes.ENUM({
          values: [
            MatchScoreTypesEnum.halfTime,
            MatchScoreTypesEnum.fullTime,
            MatchScoreTypesEnum.extraTime,
            MatchScoreTypesEnum.penalties,
          ],
        }),
        allowNull: false,
        defaultValue: MatchScoreTypesEnum.fullTime,
      },
      home: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      away: {
        type: DataTypes.SMALLINT,
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
