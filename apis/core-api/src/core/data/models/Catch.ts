import { CatchTypeEnum } from '@ultras/utils';
import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Post } from 'core/data/models/Post';
import { Match } from 'core/data/models/Match';

export interface CatchAttributes {
  id: ResourceIdentifier;
  type: CatchTypeEnum;
  userId: null | ResourceIdentifier;
  matchId: null | ResourceIdentifier;
  postId: null | ResourceIdentifier;
}

export type CatchCreationAttributes = Optional<CatchAttributes, 'id'>;

export class Catch
  extends Model<CatchAttributes, CatchCreationAttributes>
  implements CatchAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public type!: CatchTypeEnum;
  public userId!: null | ResourceIdentifier;
  public matchId!: null | ResourceIdentifier;
  public postId!: null | ResourceIdentifier;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly post?: Post;
  public readonly match?: Match;

  // associations
  static associate(models: any) {
    Catch.belongsTo(models.Match, {
      as: resources.MATCH.ALIAS.SINGULAR,
      foreignKey: 'matchId',
    });

    Catch.belongsTo(models.Post, {
      as: resources.POST.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Catch => {
  Catch.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM({
          values: [CatchTypeEnum.match, CatchTypeEnum.post],
        }),
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: resources.USER.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      matchId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: {
            tableName: resources.POST.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      postId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: {
            tableName: resources.MATCH.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: resources.LIKE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'matchId'],
        },
        {
          unique: true,
          fields: ['userId', 'postId'],
        },
      ],
    }
  );

  return Catch;
};
