'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import config from '../config/config.js';

const basename = path.basename(__filename);

const db: any = {};

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config as Sequelize.Options
);

const extension = process.env.NODE_ENV === 'production' ? '.js' : '.ts';

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === extension;
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
