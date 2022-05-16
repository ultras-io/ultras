import { dbConfig } from '../../../config';

export const commonExcludeFields = [
  'dataRapidId',
  'createdAt',
  'updatedAt',
  'deletedAt',
  // more filed to exclude globally ...
];

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
        exclude: commonExcludeFields,
      },
    },
  },
};

export default configs;
export const production = configs;
export const development = configs;
