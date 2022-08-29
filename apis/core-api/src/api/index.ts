import '../module-alias.js';

import Koa from 'koa';
import { App, Database } from 'modules/initializators';
import { IApp, IDatabase } from 'modules/initializators/types';

import { MODE } from 'utils/processEnvDetector';

import { dbConfig, serverConfig } from 'config';
import { KoaApp } from 'types';

import bootstrap from './bootstrap';
import PushNotificationService from '@ultras/services/PushNotificationService';

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

PushNotificationService.send({
  title: 'Ultras',
  message: 'Real Mardid - Barcelona match will start soon.',
  imageUrl:
    'https://i0.wp.com/elartedf.com/wp-content/uploads' +
    '/2017/11/E01_0152.jpg?resize=550%2C366',
  tokens: [
    'f4Av_srt502Gml3JHOge9t:' +
      'APA91bF-0565twV5B24c1c6475HKhDn0RXhVU1M0J2ODl6U71XvthjjvC8ZsR9HVYJ0cy05xnKriLN' +
      '-9bQ-Mq5Y3ZRZ3ikqztFCAcmI6SGHadjVuPRZue_ObicYEI6h7H0qfCSA7YX7P',
  ],
});

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
