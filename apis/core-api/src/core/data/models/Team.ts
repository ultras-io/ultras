import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import { TeamTypes } from '@ultras/utils';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Country } from 'core/data/models/Country';
import { City } from 'core/data/models/City';
import { Venue } from 'core/data/models/Venue';

export interface TeamAttributes {
  id: number;
  name: string;
  cityId: number;
  countryId: number;
  venueId: number | null;
  founded?: number;
  logo: string;
  type: TeamTypes;
  dataRapidId: number;
}

export type TeamCreationAttributes = Optional<TeamAttributes, 'id'>;

export class Team
  extends Model<TeamAttributes, TeamCreationAttributes>
  implements TeamAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public cityId!: number;
  public countryId!: number;
  public venueId!: number;
  public founded!: number;
  public logo!: string;
  public type!: TeamTypes;
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
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      cityId: {
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
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
        type: new DataTypes.INTEGER(),
        allowNull: true,
      },
      logo: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      type: {
        type: new DataTypes.ENUM({
          values: [TeamTypes.club, TeamTypes.national],
        }),
        allowNull: false,
      },
      dataRapidId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      tableName: resources.TEAM.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    },
  );

  return Team;
};
