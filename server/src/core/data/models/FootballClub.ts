import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface FootballClubAttributes {
  id: number;
  name: string;
  code: string;
}

export type FootballClubCreationAttributes = Optional<
  FootballClubAttributes,
  'id'
>;

export class FootballClub
  extends Model<FootballClubAttributes, FootballClubCreationAttributes>
  implements FootballClubAttributes
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

module.exports = (sequelize: Sequelize): typeof FootballClub => {
  FootballClub.init(
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
      tableName: resources.FOOTBALL_CLUB.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    },
  );

  return FootballClub;
};
