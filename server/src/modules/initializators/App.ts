import {IDatabase} from './Database';

const http = require('http');
import * as Koa from 'koa';

type AppArgs = {
  app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  database: IDatabase;
};

class App {
  private database: IDatabase;
  private app: Koa<Koa.DefaultState, Koa.DefaultContext>;

  constructor({app, database}: AppArgs) {
    this.app = app;
    this.database = database;
  }

  async run({port}: {port: number}) {
    await this.database.init();

    const server = http.createServer(this.app.callback());

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(`Server is running on port : ${port} ✅`);
    });
  }
}

module.exports = App;
