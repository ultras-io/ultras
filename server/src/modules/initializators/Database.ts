export interface IDatabase {
  init: () => Promise<never>;
}
/**
 * Class Database
 */
class Database implements IDatabase {
  logging = false;
  constructor(logging = false) {
    this.logging = logging;
  }

  async init(): Promise<never> {
    // @TODO authenticate database
    console.info('Connected to postgres SQL database ✅');

    // @TODO return the promise of database synchronisation process
    return new Promise<never>(() => null);
  }
}

export default Database;
