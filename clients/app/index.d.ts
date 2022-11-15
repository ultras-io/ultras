declare type AppEnv = 'development' | 'staging' | 'production';

declare module '@env' {
  export const REACT_APP_NODE_ENV: AppEnv;
}
