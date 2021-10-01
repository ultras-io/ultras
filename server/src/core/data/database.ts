import { dbConfig } from '../../config'; // is not alias, because it is not possible to run sequelize migration

// @TODO fix migration issue
export default {
  development: {
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
    dialect: 'postgres',
  },
};
