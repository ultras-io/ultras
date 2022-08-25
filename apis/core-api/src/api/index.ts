import '../module-alias.js';

import Koa from 'koa';
import { App, Database } from 'modules/initializators';
import { IApp, IDatabase } from 'modules/initializators/types';

import { MODE } from 'utils/processEnvDetector';

import { dbConfig, serverConfig } from 'config';
import { KoaApp } from 'types';

import bootstrap from './bootstrap';

const admin = require('firebase-admin');

const serviceAccount = require('../../firebase-admin-sdk-cy59v-4d877b504a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin.messaging().send({
  token:
    'dNuGQ6_Fvh38HtBdqPonoC:APA91bHxMSded-FQVf3TDd1TbpcT1b6RJs' +
    '_RZWlQ3hGOTi4pA1H-nlbzYdZQGgPpJXwieK9pHxz6xF9KQbV_l3oTyShmlJIfCnWkWdRdOM' +
    '-czwvqk_as112dpto4MaCt4UcDI1sMxOeD',

  notification: {
    title: 'Ultras',
    body: 'Real Mardid - Barcelona match will start soon.',
    imageUrl:
      'https://i0.wp.com/elartedf.com/wp-content/uploads' +
      '/2017/11/E01_0152.jpg?resize=550%2C366',
  },

  apns: {
    payload: {
      aps: {
        alert: {
          title: 'Ultras',
          body: 'Real Mardid - Barcelona match will start soon.',
        },
      },
    },
  },
});

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

if (MODE === 'production') {
  server.run({ port: 443 }).catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
} else {
  server.run({ port }).catch((err: Error) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
}
