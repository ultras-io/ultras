import { Sequelize, QueryInterface } from 'sequelize';
import { FanClubMemberRoleEnum } from '@ultras/utils';
import { ULTRAS_CORE } from '../lcp/schemas';

module.exports = {
  async up(queryInterface: QueryInterface, sequelize: Sequelize) {
    return queryInterface.bulkInsert(
      {
        tableName: 'FanClubMemberRole',
        schema: ULTRAS_CORE,
      },
      [
        {
          role: FanClubMemberRoleEnum.owner,
          description: 'Fan club owner role.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: FanClubMemberRoleEnum.admin,
          description: 'Fan club admin role.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: FanClubMemberRoleEnum.member,
          description: 'Fan club member role.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    return queryInterface.bulkDelete('FanClubMemberRole', {}, {});
  },
};
