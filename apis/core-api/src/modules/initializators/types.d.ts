import { KoaApp } from './App';

export interface IDatabase {
  init: () => Promise<any>;
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
