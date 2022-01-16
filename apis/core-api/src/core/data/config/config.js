import { dbConfig } from '../../../config';

const configs = {
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: true,
  },
  timezone: '+00:00',
  define: {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  },
};

export default configs;
