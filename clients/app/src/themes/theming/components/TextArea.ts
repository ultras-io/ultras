import colors from '../colors';
import { ComponentParams } from './types';

export default {
  defaultProps: {
    clearButtonMode: 'always',
    autoCapitalize: 'none',
    borderRadius: 'lg',
    borderWidth: 0,
    autoCorrect: false,
  },
  variants: {
    form: ({ colorMode }: ComponentParams) => {
      return {
        h: 90,
        bg: colors[colorMode].backgroundInput,
        style: {
          color: colors[colorMode].textSecondary,
          fontSize: 17,
          fontWeight: '500',
        },
      };
    },
  },
};
