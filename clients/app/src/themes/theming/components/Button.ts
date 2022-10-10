import colors from '../colors';
import { ComponentParams, BuildParamsType } from './types';

const buildPrimaryButton = ({ background, pressedBg, textColor }: BuildParamsType) => ({
  height: 50,
  borderRadius: 13,
  backgroundColor: background,
  _text: { fontSize: 17, fontWeight: 600, color: textColor },
  _pressed: { backgroundColor: pressedBg },
});

const buildSecondaryButton = ({
  background,
  pressedBg,
  textColor,
  height,
}: BuildParamsType) => ({
  alignSelf: 'flex-start',
  paddingX: '3',
  rounded: 'full',
  backgroundColor: background,
  height: height,
  _text: { color: textColor },
  _pressed: { backgroundColor: pressedBg },
});

const buildActionButton = ({ background, pressedBg, textColor }: BuildParamsType) => ({
  height: 34,
  rounded: 8,
  backgroundColor: background,
  _text: { fontSize: 'xl', fontWeight: 600, color: textColor },
  _pressed: { backgroundColor: pressedBg },
});

export default {
  defaultProps: () => {},
  variants: {
    primary: ({ colorMode, disabled = false }: ComponentParams) =>
      buildPrimaryButton({
        background: disabled
          ? colors[colorMode].buttonPrimaryDisabled
          : colors[colorMode].buttonPrimary,
        textColor: disabled
          ? colors[colorMode].textSeptenary
          : colors[colorMode].textPrimary,
        pressedBg: colors[colorMode].buttonPrimaryPressed,
      }),

    primaryInvert: ({ colorMode, disabled = false }: ComponentParams) =>
      buildPrimaryButton({
        background: disabled
          ? colors[colorMode].backgroundDividerTransparent
          : colors[colorMode].backgroundInput,
        textColor: disabled
          ? colors[colorMode].textSeptenary
          : colors[colorMode].textPrimary,
        pressedBg: colors[colorMode].buttonPrimaryPressed,
      }),

    secondary: ({ colorMode, disabled = false }: ComponentParams) =>
      buildSecondaryButton({
        background: disabled
          ? colors[colorMode].buttonSecondaryDisabled
          : colors[colorMode].buttonSecondary,
        textColor: disabled
          ? colors[colorMode].textSeptenary
          : colors[colorMode].textPrimary,
        pressedBg: colors[colorMode].buttonSecondaryPressed,
        height: 25,
      }),

    secondaryInvert: ({ colorMode }: ComponentParams) =>
      buildSecondaryButton({
        background: colors[colorMode].buttonSecondaryInvert,
        textColor: colors[colorMode].textPrimaryInvert,
        pressedBg: colors[colorMode].buttonSecondaryInvertPressed,
        height: 5,
      }),

    action: ({ colorMode, disabled = false }: ComponentParams) =>
      buildActionButton({
        background: disabled
          ? colors[colorMode].buttonActionDisabled
          : colors[colorMode].buttonAction,
        textColor: disabled
          ? colors[colorMode].textSeptenaryInvert
          : colors[colorMode].textPrimaryInvert,
        pressedBg: colors[colorMode].buttonActionPressed,
      }),

    actionInvert: ({ colorMode, disabled = false }: ComponentParams) =>
      buildActionButton({
        background: disabled
          ? colors[colorMode].buttonActionInvertDisabled
          : colors[colorMode].buttonActionInvert,
        textColor: disabled
          ? colors[colorMode].textSeptenary
          : colors[colorMode].textPrimary,
        pressedBg: colors[colorMode].buttonActionInvertPressed,
      }),

    empty: ({ colorMode, disabled = false }: ComponentParams) => {
      return {
        height: 30,
        _text: {
          fontSize: 'xl',
          color: disabled
            ? colors[colorMode].textSeptenary
            : colors[colorMode].textPrimary,
        },
      };
    },
  },
};
