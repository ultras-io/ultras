const path = require('path');
const moduleAlias = require('module-alias');

const aliases = {
  '@root': '.',
  api: './api',
  config: './config',
  base: './base',
  core: './core',
  modules: './modules',
  scripts: './scripts',
  services: './services',
  types: './types',
  utils: './utils',
  '@constants': './config/constants.ts',
};

const extension = process.env.NODE_ENV === 'production' ? '.js' : '.ts';

const mappedAliases = Object.keys(aliases).reduce((acc, aliasName) => {
  let aliasPath = aliases[aliasName];
  if (aliasPath.endsWith('.ts')) {
    aliasPath = aliasPath.substring(0, aliasPath.length - 3) + extension;
  }

  acc[aliasName] = path.join(__dirname, aliasPath);
  return acc;
}, {});

moduleAlias.addAliases(mappedAliases);
