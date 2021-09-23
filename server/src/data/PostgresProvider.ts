import Knex from 'knex';

import { dbConfig } from 'config';

/**
 * Initialize a new Postgres provider
 */
// @TODO correct return type
export function create(): any {
  const knex = Knex({
    client: dbConfig.dialect,
    connection: {
      user: dbConfig.username,
      password: dbConfig.password,
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
    },
    debug: dbConfig.logging,
    /*pool: {
      min: Database.poolMin,
      max: Database.poolMax,
      idleTimeoutMillis: Database.poolIdle,
    },*/
    acquireConnectionTimeout: 2000,
  });

  return knex;
}

export default create;
