import colors from '../colors';
import { ComponentParams } from './types';

export const ActionsheetContent = {
  baseStyle: ({ colorMode }: ComponentParams) => ({
    bgColor: colors[colorMode].backgroundActionSheet,
    pb: 12,
  }),
};

export const ActionsheetItem = {
  baseStyle: ({ colorMode }: ComponentParams) => ({
    bgColor: colors[colorMode].transparent,
    borderColor: colors[colorMode].backgroundCard,
    borderBottomWidth: 0.5,
    _text: {
      fontSize: '3xl',
      letterSpacing: 0.12,
    },
  }),
};
