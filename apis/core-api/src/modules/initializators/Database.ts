import { IDatabase } from './types';

import db from 'core/data/models';

/**
 * Class Database
 */
class Database implements IDatabase {
  private readonly logging: boolean = false;

  public constructor(logging = false) {
    this.logging = logging;
  }

  public async init(): Promise<any> {
    if (db.sequelize) {
      await db.sequelize.authenticate();
      // eslint-disable-next-line no-console
      console.info('Connected to postgres SQL database ✅');

      return db.sequelize.sync();
    }
  }
}

export default Database;
