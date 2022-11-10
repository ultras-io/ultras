import { CatchTypeEnum } from '@ultras/utils';
import { QueryInterface, DataTypes } from 'sequelize';

import resources from '../lcp/resources';
import schemas, { ULTRAS_CORE } from '../lcp/schemas';
import { Sequelize } from 'sequelize';

const table = {
  tableName: resources.LIKE.RELATION,
  schema: ULTRAS_CORE,
};

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable(
      table,
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM({
            values: [CatchTypeEnum.match, CatchTypeEnum.post],
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
          Catch_userId_matchId_unique: {
            fields: ['userId', 'matchId'],
          },
          Catch_userId_postId_unique: {
            fields: ['userId', 'postId'],
          },
        },
      }
    );

    await queryInterface.addIndex(table, ['userId', 'matchId'], { unique: true });
    await queryInterface.addIndex(table, ['userId', 'postId'], { unique: true });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(table);
  },
};
