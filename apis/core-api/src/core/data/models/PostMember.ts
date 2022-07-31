import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { User } from 'core/data/models/User';
import { Post } from 'core/data/models/Post';

export interface PostMemberAttributes {
  id: ResourceIdentifier;
  postId: ResourceIdentifier;
  userId: ResourceIdentifier;
}

export type PostMemberCreationAttributes = Optional<PostMemberAttributes, 'id'>;

export class PostMember
  extends Model<PostMemberAttributes, PostMemberCreationAttributes>
  implements PostMemberAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public postId!: ResourceIdentifier;
  public userId!: ResourceIdentifier;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly post?: Post;
  public readonly user?: User;

  // associations
  static associate(models: any) {
    PostMember.belongsTo(models.User, {
      as: resources.USER.ALIAS.SINGULAR,
      foreignKey: 'userId',
    });

    PostMember.belongsTo(models.Post, {
      as: resources.POST.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof PostMember => {
  PostMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: resources.POST.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    },
    {
      tableName: resources.POST_MEMBER.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['postId', 'userId'],
        },
      ],
    }
  );

  return PostMember;
};
