import { Sequelize, IQuery } from 'sequelize';
import { FanClubMemberRoleEnum } from '@ultras/utils';
import { ULTRAS_CORE } from '../lcp/schemas';

const table = {
  tableName: 'FanClubMemberRole',
  schema: ULTRAS_CORE,
};

module.exports = {
  async up(Iquery: IQuery, sequelize: Sequelize) {
    return Iquery.bulkInsert(table, [
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
    ]);
  },

  async down(Iquery: IQuery, sequelize: Sequelize) {
    return Iquery.bulkDelete('FanClubMemberRole', {}, {});
  },
};
