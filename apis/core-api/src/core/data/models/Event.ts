import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { EventPrivacyEnum } from '@ultras/utils';
import { ResourceIdentifier } from 'types';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';
import { Post } from 'core/data/models/Post';
import { Location } from 'core/data/models/Location';

export interface EventAttributes {
  id: ResourceIdentifier;
  postId: ResourceIdentifier;
  locationId: Nullable<ResourceIdentifier>;
  dateTime: Date;
  privacy: EventPrivacyEnum;
}

export type EventCreationAttributes = Optional<EventAttributes, 'id'>;

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: ResourceIdentifier;
  public postId!: ResourceIdentifier;
  public locationId!: Nullable<ResourceIdentifier>;
  public dateTime!: Date;
  public privacy!: EventPrivacyEnum;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties
  public readonly post?: Post;
  public readonly location?: Location;

  // associations
  static associate(models: any) {
    Event.belongsTo(models.Post, {
      as: resources.POST.ALIAS.SINGULAR,
      foreignKey: 'postId',
    });

    Event.belongsTo(models.Location, {
      as: resources.LOCATION.ALIAS.SINGULAR,
      foreignKey: 'locationId',
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
      locationId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: {
            tableName: resources.LOCATION.RELATION,
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
