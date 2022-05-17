import { FanClubPrivacyEnum } from '@ultras/utils';
import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Country } from 'core/data/models/Country';
import { City } from 'core/data/models/City';
import { Team } from 'core/data/models/Team';

export interface FanClubAttributes {
  id: ResourceIdentifier;
  name: string;
  description: string | null;
  countryId: ResourceIdentifier;
  cityId: ResourceIdentifier;
  teamId: ResourceIdentifier;
  ownerId: ResourceIdentifier;
  avatar: string;
  coverPhoto: string | null;
  isOfficial: boolean;
  privacy: FanClubPrivacyEnum;
  membersCount: number;
}

export type FanClubCreationAttributes = Optional<
  FanClubAttributes,
  'id' | 'description' | 'coverPhoto' | 'isOfficial' | 'membersCount'
>;

export class FanClub
  extends Model<FanClubAttributes, FanClubCreationAttributes>
  implements FanClubAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public name!: string;
  public description!: string | null;
  public countryId!: ResourceIdentifier;
  public cityId!: ResourceIdentifier;
  public teamId!: ResourceIdentifier;
  public ownerId!: ResourceIdentifier;
  public avatar!: string;
  public coverPhoto!: string | null;
  public isOfficial!: boolean;
  public privacy!: FanClubPrivacyEnum;
  public membersCount!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly country?: Country;
  public readonly city?: City;
  public readonly team?: Team;

  // association methods
  public getCountry!: HasOneGetAssociationMixin<Country>;
  public getCity!: HasOneGetAssociationMixin<City>;
  public getTeam!: HasOneGetAssociationMixin<Team>;

  // associations

  static associate(models: any) {
    FanClub.belongsTo(models.Country, {
      as: resources.COUNTRY.ALIAS.SINGULAR,
      foreignKey: 'countryId',
    });

    FanClub.belongsTo(models.City, {
      as: resources.CITY.ALIAS.SINGULAR,
      foreignKey: 'cityId',
    });

    FanClub.belongsTo(models.Team, {
      as: resources.TEAM.ALIAS.SINGULAR,
      foreignKey: 'teamId',
    });

    FanClub.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'ownerId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof FanClub => {
  FanClub.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: resources.CITY.RELATION,
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
      ownerId: {
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isOfficial: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      privacy: {
        type: DataTypes.ENUM({
          values: [FanClubPrivacyEnum.public, FanClubPrivacyEnum.private],
        }),
        allowNull: false,
      },
      membersCount: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: resources.FAN_CLUB.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return FanClub;
};
