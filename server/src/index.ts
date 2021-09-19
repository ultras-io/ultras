import 'module-alias/register';

import Koa from 'koa';
import { App, Database } from 'modules/initializators';
import { IApp, IDatabase } from 'modules/initializators/types';

import { MODE } from 'utils/processEnvDetector';

import { dbConfig, serverConfig } from 'config/index';
import { KoaApp } from 'types/index';

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
 * ############## RUN SERVER ##############
 */
const { port } = serverConfig;

if (MODE === 'production') {
  server.run({ port: 443 }).catch((err: Error) => {
    console.error(err);
  });
} else {
  server.run({ port }).catch((err: Error) => {
    console.error(err);
  });
}
