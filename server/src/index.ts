import Koa from 'koa';
import cors from '@koa/cors';
// import * as restify from './middlewares';
import {App, Database} from './modules/initializators';
import {dbConfig, serverConfig} from './config';
import verifyCorsOrigin from './utils/verifyCorsOrigin';

import {MODE} from './utils/processEnvDetector';
// database instance
const database = new Database(dbConfig.logging);

// application instances
const app = new Koa();
/*
  app.proxy = true;
*/

const server = new App({
  database,
  app,
});

/**
 * ############## MIDDLEWARES ##############
 */

app.use(
  cors({
    origin: verifyCorsOrigin,
  }),
);

// app.use(restify());

/**
 * ############## ROUTES ##############
 */
require('./routes')(app);

/**
 * ############## RUN SERVER ##############
 */
const {port} = serverConfig;

if (MODE === 'production') {
  server.run({}).catch((err: Error) => {
    console.error(err);
  });
} else {
  server.run({port}).catch((err: Error) => {
    console.error(err);
  });
}
