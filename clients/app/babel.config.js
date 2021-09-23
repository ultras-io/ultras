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
          components: './src/components',
        },
      },
    ],
  ],
};
