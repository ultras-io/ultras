import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface NationalTeamAttributes {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export type NationalTeamCreationAttributes = Optional<
  NationalTeamAttributes,
  'id'
>;

export class NationalTeam
  extends Model<NationalTeamAttributes, NationalTeamCreationAttributes>
  implements NationalTeamAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public code!: string;
  public flag!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associations

  // associated properties
}

module.exports = (sequelize: Sequelize): typeof NationalTeam => {
  NationalTeam.init(
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
      flag: {
        type: new DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      tableName: resources.NATIONAL_TEAM.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      sequelize,
    },
  );

  return NationalTeam;
};
