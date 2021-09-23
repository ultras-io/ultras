import { IDatabase } from './types';
import { create } from '../../data/PostgresProvider';

/**
 * Class Database
 */
class Database implements IDatabase {
  private logging = false;

  public constructor(logging = false) {
    this.logging = logging;
  }

  public async init(): Promise<any> {
    const database = await create();
    try {
      await database.raw('SELECT now()');
      console.info('Connected to postgres SQL database ✅');
    } catch (e) {
      console.error('Unable to connect to a postgres SQL database');
      throw e;
    }
    // @TODO return the promise of database synchronisation process
    return database;
  }
}

export default Database;
