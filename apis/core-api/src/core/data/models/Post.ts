import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { PostTypeEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { User } from 'core/data/models/User';
import { FanClub } from 'core/data/models/FanClub';
import { Match } from 'core/data/models/Match';
import { Event } from 'core/data/models/Event';
// import { Topic } from 'core/data/models/Topic';

export interface PostAttributes {
  id: ResourceIdentifier;
  type: PostTypeEnum;
  authorId: ResourceIdentifier;
  matchId: Nullable<ResourceIdentifier>;
  fanClubId: Nullable<ResourceIdentifier>;
  title: Nullable<string>;
  content: Nullable<string>;
  commentsCount: number;
  likesCount: number;
}

export type PostCreationAttributes = Optional<PostAttributes, 'id'>;

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public type!: PostTypeEnum;
  public authorId!: ResourceIdentifier;
  public matchId!: Nullable<ResourceIdentifier>;
  public fanClubId!: Nullable<ResourceIdentifier>;
  public title!: string;
  public content!: string;
  public commentsCount!: number;
  public likesCount!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly author?: User;
  public readonly match?: Match;
  public readonly fanClub?: FanClub;
  public readonly event?: Event;
  // public readonly topic?: Topic;

  // associations
  static associate(models: any) {
    Post.belongsTo(models.User, {
      as: 'author',
      foreignKey: 'authorId',
    });

    Post.belongsTo(models.Match, {
      as: resources.MATCH.ALIAS.SINGULAR,
      foreignKey: 'matchId',
    });

    Post.belongsTo(models.FanClub, {
      as: resources.FAN_CLUB.ALIAS.SINGULAR,
      foreignKey: 'fanClubId',
    });

    Post.hasOne(models.Event, {
      as: resources.EVENT.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });

    // Post.hasOne(models.Topic, {
    //   as: resources.EVENT.ALIAS.SINGULAR,
    //   foreignKey: 'postId',
    // });
  }
}

module.exports = (sequelize: Sequelize): typeof Post => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM({
          values: [PostTypeEnum.event, PostTypeEnum.room],
        }),
        allowNull: false,
      },
      authorId: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
            tableName: resources.MATCH.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      fanClubId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: {
            tableName: resources.FAN_CLUB.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      commentsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: resources.POST.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return Post;
};
