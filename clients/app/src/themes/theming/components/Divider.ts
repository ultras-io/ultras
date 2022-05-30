import colors from '../colors';
import { ComponentParams } from './types';

export default {
  defaultProps: {
    thickness: '.5',
  },
  baseStyle: ({ colorMode }: ComponentParams) => ({
    bgColor: colors[colorMode].backgroundDivider,
  }),
};
