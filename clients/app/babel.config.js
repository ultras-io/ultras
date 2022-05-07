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
          services: './src/services',
          stores: './src/stores',
          styles: './src/styles',
          utils: './src/utils',
          i18n: './src/i18n',
          themes: './src/themes',
        },
      },
    ],
  ],
};
