import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface VenueAttributes {
  id: number;
  name: string;
  code: string;
}

export type VenueCreationAttributes = Optional<VenueAttributes, 'id'>;

export class Venue
  extends Model<VenueAttributes, VenueCreationAttributes>
  implements VenueAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public code!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associations

  // associated properties
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
      code: {
        type: new DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: resources.VENUE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    },
  );

  return Venue;
};
