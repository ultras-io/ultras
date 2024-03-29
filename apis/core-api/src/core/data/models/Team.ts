import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import { TeamTypesEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Country } from 'core/data/models/Country';
import { City } from 'core/data/models/City';
import { Venue } from 'core/data/models/Venue';

export interface TeamAttributes {
  id: ResourceIdentifier;
  name: string;
  cityId: ResourceIdentifier;
  countryId: ResourceIdentifier;
  venueId: ResourceIdentifier | null;
  founded?: number;
  logo: string;
  type: TeamTypesEnum;
  dataRapidId: number;
}

export type TeamCreationAttributes = Optional<TeamAttributes, 'id'>;

export class Team
  extends Model<TeamAttributes, TeamCreationAttributes>
  implements TeamAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public name!: string;
  public cityId!: ResourceIdentifier;
  public countryId!: ResourceIdentifier;
  public venueId!: ResourceIdentifier | null;
  public founded!: number;
  public logo!: string;
  public type!: TeamTypesEnum;
  public dataRapidId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly country?: Country;
  public readonly city?: City;
  public readonly venue?: Venue;

  // associations

  static associate(models: any) {
    Team.belongsToMany(models.User, {
      as: resources.USER.ALIAS.PLURAL,
      through: resources.FAVORITE_TEAM.RELATION,
      foreignKey: 'teamId',
    });

    Team.belongsTo(models.Country, {
      as: resources.COUNTRY.ALIAS.SINGULAR,
      foreignKey: 'countryId',
    });

    Team.belongsTo(models.City, {
      as: resources.CITY.ALIAS.SINGULAR,
      foreignKey: 'cityId',
    });

    Team.belongsTo(models.Venue, {
      as: resources.VENUE.ALIAS.SINGULAR,
      foreignKey: 'venueId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Team => {
  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: resources.CITY.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      countryId: {
        type: DataTypes.SMALLINT,
        references: {
          model: {
            tableName: resources.COUNTRY.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      venueId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: resources.VENUE.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      founded: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM({
          values: [TeamTypesEnum.club, TeamTypesEnum.national],
        }),
        allowNull: false,
      },
      dataRapidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: resources.TEAM.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return Team;
};
