import { INativebaseConfig as ConfigInterface } from 'native-base';

const configs: ConfigInterface = {
  strictMode: 'warn',
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default configs;
