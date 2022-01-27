import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { DbIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { User } from './User';

export interface UserSessionAttributes {
  id: DbIdentifier;
  userId: DbIdentifier;
  fingerprint: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  userAgent: string;
  lastAccess: number;
  authToken: string;
  tokenExpiresAt: number;
}

export type UserSessionCreationAttributes = Optional<UserSessionAttributes, 'id'>;

export class UserSession
  extends Model<UserSessionAttributes, UserSessionCreationAttributes>
  implements UserSessionAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: DbIdentifier;
  public userId!: DbIdentifier;
  public fingerprint!: string;
  public ip!: string;
  public device!: string;
  public os!: string;
  public browser!: string;
  public userAgent!: string;
  public lastAccess!: number;
  public authToken!: string;
  public tokenExpiresAt!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly user?: User;

  // associations

  static associate(models: any) {
    UserSession.belongsTo(models.User, {
      as: resources.USER.ALIAS.SINGULAR,
      foreignKey: 'userId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof UserSession => {
  UserSession.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
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
      fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      os: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      browser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userAgent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastAccess: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      authToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenExpiresAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: resources.USER_SESSION.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return UserSession;
};