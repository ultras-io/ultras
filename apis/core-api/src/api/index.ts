/* eslint-disable max-len */

import '../module-alias.js';

import Koa from 'koa';
import { App, Database } from 'modules/initializators';
import { IApp, IDatabase } from 'modules/initializators/types';

import { MODE } from 'utils/processEnvDetector';

import { dbConfig, serverConfig } from 'config';
import { KoaApp } from 'types';

import bootstrap from './bootstrap';
// import PushNotificationService from '@ultras/services/PushNotificationService';

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

// const topic = 'topic-3';
// PushNotificationService.subscribeToTopic(topic, [
//   'flydhwx5EErcoQ4nhVd6FC:APA91bGnJgcGtoweAj8vB6CoMrKYXng1mlSqGY1hFOxjUlvp3VCI337UvDNO85XxGUKrgdsXJaqWkc-5irOOPns7WoUZfzyIRzz7jayxUJQujT5wXNQ2iFuf1E1LV815Gc-Y2t1PsDFQ',
// ])
//   .then(() => {
//     console.log();
//     console.log(`Successfully subscribed to topic: ${topic}`);
//     console.log();

//     PushNotificationService.send({
//       title: `Bad news !!!`,
//       message: 'Real Madrid vs Real Sossiedad match cancelled.',
//       imageUrl: 'https://www.insidesport.in/wp-content/uploads/2020/06/2017091319383128613_1505650806-800-1.jpg',
//       // tokens: [
//       //   'd_89isHY6k0imhO-duxGfs:APA91bE030Ha-U2Tya-vxF5aGUN6dB7F9foTfGTO6tHFAzgmsT7ET6EuqpedI_Ddm_7i3EAN_CdZQdm58peN6cEx_8bM7u9TSC0jl66atuZTjPXa6tFridQdj__K9qqnhT8LZvZmE69S',
//       // ],
//       topic: topic,
//     });
//   })
//   .catch(error => {
//     console.log('Error subscribing to topic:', error);
//   });

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
