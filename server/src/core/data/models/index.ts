import fs from 'fs';
import path from 'path';
import { Sequelize, Model } from 'sequelize';

const basename = path.basename(__filename);

import { dbConfig } from 'config/index';

interface IDatabase {
  sequelize?: Sequelize;
}

const db: IDatabase = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dbConfig,
);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model: Model = require(path.join(__dirname, file));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (db[modelName].associate) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
