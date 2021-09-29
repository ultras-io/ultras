module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.d.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          assets: '.src/assets',
          components: './src/components',
          config: './src/config',
          containers: './src/containers',
          core: './src/core',
          services: './src/core/services',
          navigation: './src/navigation',
          screens: './src/screens',
          store: './src/store',
          styles: './src/styles',
          utils: './src/utils',
          hooks: './src/utils/hooks',
        },
      },
    ],
  ],
};
