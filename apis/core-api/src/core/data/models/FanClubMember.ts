import { FanClubMemberStatusEnum } from '@ultras/utils';
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
import { User } from 'core/data/models/User';
import { FanClub } from 'core/data/models/FanClub';
import { FanClubMemberRole } from './FanClubMemberRole';

export interface FanClubMemberAttributes {
  id: ResourceIdentifier;
  fanClubId: ResourceIdentifier;
  memberId: ResourceIdentifier;
  roleId: ResourceIdentifier;
  status: FanClubMemberStatusEnum;
}

export type FanClubMemberCreationAttributes = Optional<FanClubMemberAttributes, 'id'>;

export class FanClubMember
  extends Model<FanClubMemberAttributes, FanClubMemberCreationAttributes>
  implements FanClubMemberAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public fanClubId!: ResourceIdentifier;
  public memberId!: ResourceIdentifier;
  public roleId!: ResourceIdentifier;
  public status!: FanClubMemberStatusEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly fanClub?: FanClub;
  public readonly member?: User;
  public readonly fanClubMemberRole?: FanClubMemberRole;

  // association methods
  public getFanClub!: HasOneGetAssociationMixin<FanClub>;
  public getMember!: HasOneGetAssociationMixin<User>;

  // associations
  static associate(models: any) {
    FanClubMember.belongsTo(models.FanClub, {
      as: resources.FAN_CLUB.ALIAS.SINGULAR,
      foreignKey: 'fanClubId',
    });

    FanClubMember.belongsTo(models.User, {
      as: 'member',
      foreignKey: 'memberId',
    });

    FanClubMember.belongsTo(models.FanClubMemberRole, {
      as: resources.FAN_CLUB_MEMBER_ROLE.ALIAS.SINGULAR,
      foreignKey: 'roleId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof FanClubMember => {
  FanClubMember.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      fanClubId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: resources.FAN_CLUB.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      memberId: {
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
      roleId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: {
            tableName: resources.FAN_CLUB_MEMBER_ROLE.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM({
          values: [
            FanClubMemberStatusEnum.notRelated,
            FanClubMemberStatusEnum.active,
            FanClubMemberStatusEnum.pendingRequest,
            FanClubMemberStatusEnum.pendingInvitation,
            FanClubMemberStatusEnum.banned,
          ],
        }),
        allowNull: false,
      },
    },
    {
      tableName: resources.FAN_CLUB_MEMBER.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['fanClubId', 'memberId'],
          name: 'FanClubMember_fanClubId_memberId_unique_constraint',
        },
      ],
    }
  );

  return FanClubMember;
};
