import { INativebaseConfig as IConfig } from 'native-base';

const configs: IConfig = {
  strictMode: 'warn',
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default configs;
