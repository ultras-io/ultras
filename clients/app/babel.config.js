const json5 = require('json5');
const fs = require('fs');
const path = require('path');

const tsconfigFilename = path.join(__dirname, 'tsconfig.json');
const tsconfigContent = fs.readFileSync(tsconfigFilename, 'utf-8');
const tsconfig = json5.parse(tsconfigContent);

const pathBase = tsconfig.compilerOptions.baseUrl;
const pathAliases = tsconfig.compilerOptions.paths;

const aliases = Object.keys(pathAliases).reduce((acc, key) => {
  const validKey = key.replace('/*', '');
  const validValue = pathAliases[key][0].replace('/*', '');

  acc[validKey] = path.join(pathBase, validValue);
  if (!acc[validKey].startsWith('./')) {
    acc[validKey] = './' + acc[validKey];
  }

  return acc;
}, {});

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: false,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.ios.jsx',
          '.android.js',
          '.android.jsx',
          '.native.js',
          '.native.jsx',
          '.js',
          '.jsx',
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.native.ts',
          '.native.tsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.json',
        ],
        alias: aliases,
      },
    ],
  ],
};
