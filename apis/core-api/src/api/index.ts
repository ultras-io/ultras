import '../module-alias.js';

import Koa from 'koa';
import { App, Database } from 'modules/initializators';
import { IApp, IDatabase } from 'modules/initializators/types';

import { dbConfig, serverConfig } from 'config';
import { KoaApp } from 'types';

import bootstrap from './bootstrap';

// database instance
const database: IDatabase = new Database(dbConfig.logging);

// application instance
const app: KoaApp = new Koa();

// in app App instance
const server: IApp = new App({
  database,
  app,
});

/**
 * ############## BOOTSTRAP APP ##############
 */
bootstrap();

/**
 * ############## RUN SERVER ##############
 */
const { port } = serverConfig;

server.run({ port }).catch((err: Error) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
