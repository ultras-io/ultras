import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { RoomPrivacyEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Post } from 'core/data/models/Post';

export interface RoomAttributes {
  id: ResourceIdentifier;
  postId: ResourceIdentifier;
  dateTime: Date;
  privacy: RoomPrivacyEnum;
}

export type RoomCreationAttributes = Optional<RoomAttributes, 'id'>;

export class Room
  extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public postId!: ResourceIdentifier;
  public dateTime!: Date;
  public privacy!: RoomPrivacyEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly post?: Post;

  // associations
  static associate(models: any) {
    Room.belongsTo(models.Post, {
      as: resources.POST.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Room => {
  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: resources.POST.RELATION,
            schema: schemas.ULTRAS_CORE,
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      privacy: {
        type: DataTypes.ENUM({
          values: [RoomPrivacyEnum.admin, RoomPrivacyEnum.member],
        }),
        allowNull: false,
      },
    },
    {
      tableName: resources.ROOM.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return Room;
};
