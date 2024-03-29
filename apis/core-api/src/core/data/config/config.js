import { dbConfig } from '../../../config';
import { ULTRAS_CORE } from '../lcp/schemas';

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
  logging: dbConfig.logging,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  timezone: '+00:00',
  define: {
    defaultScope: {
      attributes: {
        exclude: commonExcludeFields,
      },
    },
  },
  migrationStorage: 'sequelize',
  migrationStorageTableSchema: ULTRAS_CORE,
  migrationStorageTableName: '_migrations',
  seederStorage: 'sequelize',
  seederStorageTableSchema: ULTRAS_CORE,
  seederStorageTableName: '_seeders',
};

export default configs;
export const production = configs;
export const development = configs;
