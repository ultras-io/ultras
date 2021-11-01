import { ULTRAS_CORE, ULTRAS_LOGS } from '../lcp/schemas';
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createSchema(ULTRAS_CORE);
    await queryInterface.createSchema(ULTRAS_LOGS);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    /* await queryInterface.dropSchema(ULTRAS_CORE);
    await queryInterface.dropSchema(ULTRAS_LOGS);*/
  },
};
