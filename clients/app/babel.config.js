module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.d.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          views: './src/views',
          config: './src/screens',
          core: './src/core',
          services: './src/core/services',
          navigation: './src/navigation',
          store: './src/store',
          styles: './src/styles',
          utils: './src/utils',
          hooks: './src/utils/hooks',
          i18n: './src/i18n',
          themes: './src/themes',
        },
      },
    ],
  ],
};
