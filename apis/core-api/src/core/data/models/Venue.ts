import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Country } from 'core/data/models/Country';
import { City } from 'core/data/models/City';

export interface VenueAttributes {
  id: number;
  name: string;
  address?: string;
  capacity: number;
  cityId: number;
  countryId: number;
  imageUri: string;
  dataRapidId: number;
}

export type VenueCreationAttributes = Optional<VenueAttributes, 'id'>;

export class Venue
  extends Model<VenueAttributes, VenueCreationAttributes>
  implements VenueAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public address?: string;
  public capacity!: number;
  public cityId!: number;
  public countryId!: number;
  public imageUri!: string;
  public dataRapidId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly country?: Country;
  public readonly city?: City;

  // associations

  static associate(models: any) {
    Venue.belongsTo(models.Country, {
      as: resources.COUNTRY.ALIAS.SINGULAR,
      foreignKey: 'countryId',
    });

    Venue.belongsTo(models.City, {
      as: resources.CITY.ALIAS.SINGULAR,
      foreignKey: 'cityId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Venue => {
  Venue.init(
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
      address: {
        type: new DataTypes.STRING(),
        allowNull: true,
      },
      capacity: {
        type: new DataTypes.INTEGER(),
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
      imageUri: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      dataRapidId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: resources.VENUE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return Venue;
};
