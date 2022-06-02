import colors from '../colors';
import { ComponentParams } from './types';

export default {
  defaultProps: () => {},
  variants: {
    primary: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        bg: disabled
          ? colors[colorMode].buttonPrimaryDisabled
          : colors[colorMode].buttonPrimary,
        h: 50,
        rounded: 10,
        _text: {
          fontSize: 'xl',
          fontWeight: 600,
          color: disabled
            ? colors[colorMode].textSeptenary
            : colors[colorMode].textPrimary,
        },
        _pressed: {
          bg: colors[colorMode].buttonPrimaryPressed,
        },
      };
    },
    secondary: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        alignSelf: 'flex-start',
        bg: disabled
          ? colors[colorMode].buttonSecondaryDisabled
          : colors[colorMode].buttonSecondary,
        h: 25,
        paddingX: '3',
        rounded: 'full',
        _text: {
          fontSize: 'lg',
          color: disabled
            ? colors[colorMode].textSeptenary
            : colors[colorMode].textPrimary,
        },
        _pressed: {
          bg: colors[colorMode].buttonSecondaryPressed,
        },
      };
    },

    action: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        bg: disabled
          ? colors[colorMode].buttonActionDisabled
          : colors[colorMode].buttonAction,
        h: 30,
        rounded: 'full',
        _text: {
          fontSize: 'xl',
          fontWeight: 600,
          color: disabled
            ? colors[colorMode].textSeptenaryInvert
            : colors[colorMode].textPrimaryInvert,
        },
        _pressed: {
          bg: colors[colorMode].buttonActionPressed,
        },
      };
    },

    actionInvert: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        bg: disabled
          ? colors[colorMode].buttonActionInvertDisabled
          : colors[colorMode].buttonActionInvert,
        h: 30,
        rounded: 'full',
        _text: {
          fontSize: 'xl',
          fontWeight: 600,
          color: disabled
            ? colors[colorMode].textSeptenary
            : colors[colorMode].textPrimary,
        },
        _pressed: {
          bg: colors[colorMode].buttonActionInvertPressed,
        },
      };
    },

    empty: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        _text: {
          fontSize: 'xl',
          h: 30,
          color: disabled
            ? colors[colorMode].textSeptenary
            : colors[colorMode].textPrimary,
        },
      };
    },
  },
};
