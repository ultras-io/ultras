import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { DbIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Team } from './Team';

export interface UserAttributes {
  id: DbIdentifier;
  phone: null | string;
  email: null | string;
  username: string;
  avatar: null | string;
  fullname: null | string;
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
  public id!: DbIdentifier;
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
    },
    {
      tableName: resources.USER.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return User;
};