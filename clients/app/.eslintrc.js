module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 1,
    '@typescript-eslint/no-var-requires': 0,
    'prettier/prettier': 2,
  },
};
