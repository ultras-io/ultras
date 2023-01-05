import colors from '../colors';
import { ComponentParams } from './types';

export default {
  baseStyle: ({ colorMode }: ComponentParams) => {
    return {
      backgroundColor: colors[colorMode].iconPrimary,
    };
  },
  defaultProps: {
    size: 'av-md',
  },
};
