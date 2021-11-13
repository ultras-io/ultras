import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  Association,
  HasOneGetAssociationMixin,
} from 'sequelize';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Country } from 'core/data/models/Country';

export interface CityAttributes {
  id: number;
  name: string;
  countryId: number;
}

export type CityCreationAttributes = Optional<CityAttributes, 'id'>;

export class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public countryId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly country?: Country;

  // association methods
  public getCountry!: HasOneGetAssociationMixin<Country>;

  // associations
  public static associations: {
    city: Association<City, Country>;
  };
}

module.exports = (sequelize: Sequelize): typeof City => {
  City.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(),
        allowNull: false,
        unique: {
          name: 'City_name_unique_constraint',
          msg: 'City name should be unique',
        },
      },
      countryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: resources.COUNTRY.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: resources.CITY.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    },
  );

  return City;
};
