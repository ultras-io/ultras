import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  Association,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { DbIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Country } from 'core/data/models/Country';

export interface CityAttributes {
  id: DbIdentifier;
  name: string;
  countryId: DbIdentifier;
  dataRapidId: number;
}

export type CityCreationAttributes = Optional<CityAttributes, 'id'>;

export class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: DbIdentifier;
  public name!: string;
  public countryId!: DbIdentifier;
  public dataRapidId!: DbIdentifier;

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

  // associations
  /**
   * Currently this doesn't need, useful when need to use as city.getCountry() method
   * Having this now will load runtime process memory
   */

  static associate(models: any) {
    // define association here
    City.belongsTo(models.Country, {
      as: resources.COUNTRY.ALIAS.SINGULAR,
      foreignKey: 'countryId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof City => {
  City.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataRapidId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      countryId: {
        type: DataTypes.SMALLINT,
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
    }
  );

  return City;
};
