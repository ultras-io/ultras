import { ULTRAS_CORE, ULTRAS_LOGS } from '../lcp/schemas';
import { IQuery } from 'sequelize';

export default {
  async up(Iquery: IQuery): Promise<void> {
    await Iquery.createSchema(ULTRAS_CORE);
    await Iquery.createSchema(ULTRAS_LOGS);
  },

  async down(Iquery: IQuery): Promise<void> {
    /* await Iquery.dropSchema(ULTRAS_CORE);
    await Iquery.dropSchema(ULTRAS_LOGS);*/
  },
};
