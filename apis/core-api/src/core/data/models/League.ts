import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

import { Country } from 'core/data/models/Country';

export interface LeagueAttributes {
  id: number;
  name: string;
  countryId: number;
  logo: string;
  dataRapidId: number;
}

export type LeagueCreationAttributes = Optional<LeagueAttributes, 'id'>;

export class League
  extends Model<LeagueAttributes, LeagueCreationAttributes>
  implements LeagueAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public countryId!: number;
  public logo!: string;
  public dataRapidId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly country?: Country;

  // associations

  static associate(models: any) {
    League.belongsTo(models.Country, {
      as: resources.COUNTRY.ALIAS.SINGULAR,
      foreignKey: 'countryId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof League => {
  League.init(
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
      logo: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
      dataRapidId: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
      },
    },
    {
      tableName: resources.LEAGUE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    }
  );

  return League;
};