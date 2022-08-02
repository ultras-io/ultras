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
    search: ({ colorMode }: ComponentParams) => {
      return {
        h: 36,
        bg: colors[colorMode].backgroundInput,
        style: {
          color: colors[colorMode].textTertiary,
          fontSize: 17,
        },
      };
    },
    email: ({ colorMode }: ComponentParams) => {
      return {
        h: 50,
        bg: colors[colorMode].backgroundInputInvert,
        style: {
          color: colors[colorMode].textPrimaryInvert,
          fontSize: 20,
          fontWeight: '600',
        },
      };
    },
  },
};
