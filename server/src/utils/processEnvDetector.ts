import { ENVS } from 'config/constants';

const MODE: string = process.env.NODE_ENV || 'development';

if (!MODE)
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );

if (!ENVS[MODE])
  throw new Error(
    'Invalid NODE_ENV environment variable.\n Valid values are "development", "production", "test", "staging".',
  );

const isEnvTest = process.env.NODE_ENV === ENVS.test;
const isEnvProduction = process.env.NODE_ENV === ENVS.production;
const isEnvDevelopment = process.env.NODE_ENV === ENVS.development;

export { MODE, isEnvTest, isEnvProduction, isEnvDevelopment };
