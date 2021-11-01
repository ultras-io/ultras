import { dbConfig } from '../../../config';

export const development = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: 'postgres',
};
