#!/usr/bin/env node
/* eslint-disable no-undef */

const path = require('path');
const fs = require('fs');
const os = require('os');

const fileEnv = path.join(__dirname, '..', '.env');
const fileConfig = path.join(__dirname, '..', 'build', 'configs.js');

if (!fs.existsSync(fileEnv) || !fs.existsSync(fileConfig)) {
  process.exit(1);
}

// get configs from .env
const configs = fs
  .readFileSync(fileEnv, 'utf-8')
  .split(os.EOL)
  .filter(row => !!row)
  .map(row => row.split('='));

// get and replace config.js file content
let content = fs.readFileSync(fileConfig, 'utf-8');
for (const [key, value] of configs) {
  const pattern = new RegExp(`process\\.env\\.${key}`, 'g');
  content = content.replace(pattern, `'${value}'`);
}

fs.writeFileSync(fileConfig, content, 'utf-8');
