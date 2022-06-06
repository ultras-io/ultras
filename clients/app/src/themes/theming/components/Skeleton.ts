import colors from '../colors';
import { ComponentParams } from './types';

export default {
  baseStyle: ({ colorMode }: ComponentParams) => ({
    startColor: colors[colorMode].backgroundCard,
    endColor: colors[colorMode].backgroundCard,
  }),
};
