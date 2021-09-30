import { IDatabase } from './types';
const { sequelize } = require('../../data/models');

/**
 * Class Database
 */
class Database implements IDatabase {
  private readonly logging: boolean = false;

  public constructor(logging: boolean = false) {
    this.logging = logging;
  }

  public async init(): Promise<any> {
    await sequelize.authenticate();
    console.info('Connected to postgres SQL database ✅');

    return sequelize.sync({
      logging: this.logging
    });
  }
}

export default Database;
