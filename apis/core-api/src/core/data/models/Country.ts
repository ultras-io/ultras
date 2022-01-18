import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  HasManyGetAssociationsMixin,
  Association,
} from 'sequelize';

import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { City } from 'core/data/models/City';

export interface CountryAttributes {
  id: number;
  name: string;
  code: string;
  flag: string;
  telPrefix?: string;
  dataRapidId?: number; // id of rapid api
}

export type CountryCreationAttributes = Optional<CountryAttributes, 'id'>;

export class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public code!: string;
  public flag!: string;
  public telPrefix!: string;
  public dataRapidId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly cities?: City[];

  // association methods
  public getCities!: HasManyGetAssociationsMixin<City>;

  // associations
  public static associations: {
    cities: Association<Country, City>;
  };

  // associations
  static associate(models: any) {
    // define association here
    Country.hasMany(models.City, {
      sourceKey: 'id',
      as: resources.CITY.ALIAS.PLURAL,
      foreignKey: 'countryId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Country => {
  Country.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'Country_name_unique_constraint',
          msg: 'Country name should be unique',
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telPrefix: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dataRapidId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: resources.COUNTRY.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return Country;
};
