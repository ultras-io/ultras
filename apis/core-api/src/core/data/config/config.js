import { dbConfig } from '../../../config';

const configs = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: 'postgres',
};

export default configs;
