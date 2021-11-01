import http from 'http';
import cors from '@koa/cors';

import restify from 'api/middlewares/restify';
import verifyCorsOrigin from 'utils/verifyCorsOrigin';
import registerRoute from 'api/routes';

import { IDatabase } from './types';
import { AppArgs, IApp, RunArgs } from './types';
import { KoaApp } from 'types/index';

class App implements IApp {
  private database: IDatabase;
  private readonly app: KoaApp;

  public constructor({ app, database }: AppArgs) {
    this.app = app;
    this.database = database;

    this.configure();
  }

  private configure(): void {
    // enable cors
    this.app.use(
      cors({
        origin: verifyCorsOrigin,
      }),
    );

    // proxy
    this.configureProxy();

    // restify
    this.app.use(restify());

    // routes
    registerRoute(this.app);
  }

  private configureProxy() {
    // this.app.proxy = true;
  }

  public async run({ port = 4700 }: RunArgs): Promise<any> {
    await this.database.init();

    const server = http.createServer(this.app.callback());

    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.info(`Server is running on port : ${port} ✅`);
    });
  }
}

export default App;
