import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { User } from './User';
import { Team } from './Team';

export interface FavoriteTeamAttributes {
  id: ResourceIdentifier;
  userId: ResourceIdentifier;
  teamId: ResourceIdentifier;
}

export type FavoriteTeamCreationAttributes = Optional<FavoriteTeamAttributes, 'id'>;

export class FavoriteTeam
  extends Model<FavoriteTeamAttributes, FavoriteTeamCreationAttributes>
  implements FavoriteTeamAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public userId!: ResourceIdentifier;
  public teamId!: ResourceIdentifier;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly user?: User;
  public readonly team?: Team;

  // associations

  static associate(models: any) {
    FavoriteTeam.belongsTo(models.User, {
      as: resources.USER.ALIAS.SINGULAR,
      foreignKey: 'userId',
    });

    FavoriteTeam.belongsTo(models.Team, {
      as: resources.TEAM.ALIAS.SINGULAR,
      foreignKey: 'teamId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof FavoriteTeam => {
  FavoriteTeam.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: resources.TEAM.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: resources.FAVORITE_TEAM.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'teamId'],
        },
      ],
    }
  );

  return FavoriteTeam;
};
