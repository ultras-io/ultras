import { KoaApp } from './App';

export interface IDatabase {
  init: () => any /*Promise<never>*/;
}

type AppArgs = {
  app: KoaApp;
  database: IDatabase;
};

type RunArgs = {
  port?: number;
};

interface IApp {
  run: (args: RunArgs) => Promise<unknown>;
}
