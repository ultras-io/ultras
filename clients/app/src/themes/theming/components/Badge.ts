import colors from '../colors';
import { ComponentParams } from './types';

export default {
  defaultProps: {
    rounded: 'full',
    alignSelf: 'flex-start',
  },
  variants: {
    notification: ({ colorMode }: ComponentParams) => ({
      _text: { fontSize: 'xs' },
      bg: colors[colorMode].iconNotification,
    }),
    updates: ({ colorMode }: ComponentParams) => ({
      _text: { fontSize: 'lg' },
      bg: colors[colorMode].iconUpdatesCount,
    }),
  },
};
