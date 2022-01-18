import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import { TeamTypesEnum } from '@ultras/utils';

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
  type: TeamTypesEnum;
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
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.SMALLINT,
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
        type: DataTypes.BIGINT,
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
        type: DataTypes.INTEGER,
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
      sequelize,
    }
  );

  return Team;
};
