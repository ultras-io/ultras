import { FanClubMemberRoleEnum } from '@ultras/utils';
import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface FanClubMemberRoleAttributes {
  id: ResourceIdentifier;
  role: FanClubMemberRoleEnum;
  description: string | null;
}

export type FanClubMemberRoleCreationAttributes = Optional<
  FanClubMemberRoleAttributes,
  'id' | 'description'
>;

export class FanClubMemberRole
  extends Model<FanClubMemberRoleAttributes, FanClubMemberRoleCreationAttributes>
  implements FanClubMemberRoleAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public role!: FanClubMemberRoleEnum;
  public description!: string | null;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

module.exports = (sequelize: Sequelize): typeof FanClubMemberRole => {
  FanClubMemberRole.init(
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM({
          values: [
            FanClubMemberRoleEnum.owner,
            FanClubMemberRoleEnum.admin,
            FanClubMemberRoleEnum.member,
          ],
        }),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: resources.FAN_CLUB_MEMBER_ROLE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return FanClubMemberRole;
};
