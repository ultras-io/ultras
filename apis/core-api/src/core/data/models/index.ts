'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { OrderEnum } from '@ultras/utils';

import config from '../config/config.js';

const basename = path.basename(__filename);

const db: any = {};

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config as Sequelize.Options
);

sequelize.addHook('beforeFind', function (options) {
  options = options || {};
  options.order = options.order || [];

  if (!Array.isArray(options.order)) {
    options.order = [options.order];
  }

  // check if order by id already exists.
  const idFilter = options.order.find(orderItem => {
    // skip literal queries
    if (!Array.isArray(orderItem)) {
      return false;
    }

    // nested filter: [relation, field, orderType]
    if (orderItem.length === 3) {
      return orderItem[1] === 'id';
    }

    // direct filter: [field, orderType]
    return orderItem[0] === 'id';
  });

  if (!idFilter) {
    options.order.push(['id', OrderEnum.asc]);
  }
});

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
