import lcp from '../lcp';
import { QueryInterface } from 'sequelize';

const { ULTRAS_CORE, ULTRAS_LOGS } = lcp;

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createSchema(ULTRAS_CORE);
    await queryInterface.createSchema(ULTRAS_LOGS);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropSchema(ULTRAS_CORE);
    await queryInterface.dropSchema(ULTRAS_LOGS);
  },
};
