import { UserProfilePrivacyEnum } from '@ultras/utils';
import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Team } from './Team';

export interface UserAttributes {
  id: ResourceIdentifier;
  phone: null | string;
  email: null | string;
  username: string;
  avatar: null | string;
  fullname: null | string;
  privacy?: UserProfilePrivacyEnum;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'phone' | 'email' | 'avatar' | 'fullname'
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public phone!: null | string;
  public email!: null | string;
  public username!: string;
  public avatar!: null | string;
  public fullname!: null | string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly favoriteTeams?: Array<Team>;

  // associations

  static associate(models: any) {
    User.belongsToMany(models.Team, {
      as: resources.TEAM.ALIAS.PLURAL,
      through: resources.FAVORITE_TEAM.RELATION,
      foreignKey: 'userId',
    });

    User.belongsToMany(models.FanClub, {
      as: resources.FAN_CLUB.ALIAS.PLURAL,
      through: resources.FAN_CLUB_MEMBER.RELATION,
      foreignKey: 'memberId',
    });

    User.belongsToMany(models.Post, {
      as: resources.POST.ALIAS.PLURAL,
      through: resources.POST_MEMBER.RELATION,
      foreignKey: 'userId',
    });

    User.belongsToMany(models.Match, {
      as: resources.CATCH.ALIAS.PLURAL + 'Match',
      through: {
        model: resources.CATCH.MODEL,
        unique: false,
      },
      foreignKey: 'userId',
    });

    User.belongsToMany(models.Post, {
      as: resources.CATCH.ALIAS.PLURAL + 'Post',
      through: {
        model: resources.CATCH.MODEL,
        unique: false,
      },
      foreignKey: 'userId',
    });

    User.belongsToMany(models.Match, {
      as: resources.COMMENT.ALIAS.PLURAL + 'Match',
      through: {
        model: resources.COMMENT.MODEL,
        unique: false,
      },
      foreignKey: 'userId',
    });

    User.belongsToMany(models.Post, {
      as: resources.COMMENT.ALIAS.PLURAL + 'Post',
      through: {
        model: resources.COMMENT.MODEL,
        unique: false,
      },
      foreignKey: 'userId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacy: {
        type: DataTypes.ENUM({
          values: [UserProfilePrivacyEnum.private, UserProfilePrivacyEnum.public],
        }),
        defaultValue: UserProfilePrivacyEnum.public,
      },
    },
    {
      tableName: resources.USER.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return User;
};
