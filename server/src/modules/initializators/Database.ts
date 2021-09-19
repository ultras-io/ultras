import { IDatabase } from './types';

/**
 * Class Database
 */
class Database implements IDatabase {
  private logging = false;

  public constructor(logging = false) {
    this.logging = logging;
  }

  public /*async*/ init(): any /*Promise<never>*/ {
    // @TODO authenticate database
    // console.info('Connected to postgres SQL database ✅');
    // @TODO return the promise of database synchronisation process
    return null;
  }
}

export default Database;
