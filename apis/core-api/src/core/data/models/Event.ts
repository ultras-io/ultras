import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { EventPrivacyEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Post } from 'core/data/models/Post';

export interface EventAttributes {
  id: ResourceIdentifier;
  postId: ResourceIdentifier;
  dateTime: Date;
  privacy: EventPrivacyEnum;
  locationName: string;
  locationLat: Nullable<number>;
  locationLng: Nullable<number>;
}

export type EventCreationAttributes = Optional<EventAttributes, 'id'>;

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public postId!: ResourceIdentifier;
  public dateTime!: Date;
  public privacy!: EventPrivacyEnum;
  public locationName!: string;
  public locationLat!: Nullable<number>;
  public locationLng!: Nullable<number>;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly post?: Post;

  // associations
  static associate(models: any) {
    Event.belongsTo(models.Post, {
      as: resources.POST.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });
  }
}

module.exports = (sequelize: Sequelize): typeof Event => {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
          values: [EventPrivacyEnum.public, EventPrivacyEnum.private],
        }),
        allowNull: false,
      },
      locationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationLat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      locationLng: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      tableName: resources.EVENT.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return Event;
};
