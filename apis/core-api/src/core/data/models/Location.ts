import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface LocationAttributes {
  id: ResourceIdentifier;
  name: string;
  lat?: Nullable<number>;
  lng?: Nullable<number>;
}

export type LocationCreationAttributes = Optional<LocationAttributes, 'id'>;

export class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public name!: string;
  public lat!: Nullable<number>;
  public lng!: Nullable<number>;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

module.exports = (sequelize: Sequelize): typeof Location => {
  Location.init(
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
      lat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      lng: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      tableName: resources.LOCATION.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return Location;
};
