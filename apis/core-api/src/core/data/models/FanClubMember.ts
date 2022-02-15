import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import {
  Model,
  Optional,
  Sequelize,
  DataTypes,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { DbIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { User } from 'core/data/models/User';
import { FanClub } from 'core/data/models/FanClub';

export interface FanClubMemberAttributes {
  id: DbIdentifier;
  fanClubId: DbIdentifier;
  userId: DbIdentifier;
  role: FanClubMemberRoleEnum;
  status: FanClubMemberStatusEnum;
}

export type FanClubMemberCreationAttributes = Optional<FanClubMemberAttributes, 'id'>;

export class FanClubMember
  extends Model<FanClubMemberAttributes, FanClubMemberCreationAttributes>
  implements FanClubMemberAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: DbIdentifier;
  public fanClubId!: DbIdentifier;
  public userId!: DbIdentifier;
  public role!: FanClubMemberRoleEnum;
  public status!: FanClubMemberStatusEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly fanClub?: FanClub;
  public readonly member?: User;

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
      as: resources.USER.ALIAS.SINGULAR,
      foreignKey: 'userId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof FanClubMember => {
  FanClubMember.init(
    {
      id: {
        type: DataTypes.SMALLINT,
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
      userId: {
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
      role: {
        type: DataTypes.ENUM({
          values: [
            FanClubMemberRoleEnum.admin,
            FanClubMemberRoleEnum.moderator,
            FanClubMemberRoleEnum.member,
          ],
        }),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM({
          values: [
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
          fields: ['fanClubId', 'userId'],
          name: 'FanClubMember_fanClubId_userId_unique_constraint',
        },
      ],
    }
  );

  return FanClubMember;
};
