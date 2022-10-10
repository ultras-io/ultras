import { LikeTypeEnum } from '@ultras/utils';
import { IQuery, DataTypes } from 'sequelize';

import resources from '../lcp/resources';
import schemas, { ULTRAS_CORE } from '../lcp/schemas';
import { Sequelize } from 'sequelize';

const table = {
  tableName: resources.LIKE.RELATION,
  schema: ULTRAS_CORE,
};

export default {
  async up(Iquery: IQuery): Promise<void> {
    await Iquery.createTable(
      table,
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM({
            values: [LikeTypeEnum.match, LikeTypeEnum.post],
          }),
          allowNull: false,
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
        matchId: {
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
        postId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          references: {
            model: {
              tableName: resources.MATCH.RELATION,
              schema: schemas.ULTRAS_CORE,
            },
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.fn('now'),
        },
        deletedAt: {
          allowNull: true,
          type: DataTypes.DATE,
          defaultValue: null,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        uniqueKeys: {
          Like_userId_matchId_unique: {
            fields: ['userId', 'matchId'],
          },
          Like_userId_postId_unique: {
            fields: ['userId', 'postId'],
          },
        },
      }
    );

    await Iquery.addIndex(table, ['userId', 'matchId'], { unique: true });
    await Iquery.addIndex(table, ['userId', 'postId'], { unique: true });
  },

  async down(Iquery: IQuery): Promise<void> {
    await Iquery.dropTable(table);
  },
};
