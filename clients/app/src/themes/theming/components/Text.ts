import colors from '../colors';
import { ComponentParams } from './types';

const textVariants: Array<
  | 'textHeader'
  | 'textSectionHeader'
  | 'textAction'
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textQuaternary'
  | 'textQuinary'
  | 'textSenary'
  | 'textSeptenary'
  | 'textPrimaryInvert'
  | 'textSecondaryInvert'
  | 'textTertiaryInvert'
  | 'textQuaternaryInvert'
  | 'textQuinaryInvert'
  | 'textSenaryInvert'
  | 'textSeptenaryInvert'
> = [
  'textHeader',
  'textSectionHeader',
  'textAction',
  'textPrimary',
  'textSecondary',
  'textTertiary',
  'textQuaternary',
  'textQuinary',
  'textSenary',
  'textSeptenary',
  'textPrimaryInvert',
  'textSecondaryInvert',
  'textTertiaryInvert',
  'textQuaternaryInvert',
  'textQuinaryInvert',
  'textSenaryInvert',
  'textSeptenaryInvert',
];

export default {
  defaultProps: {
    adjustsFontSizeToFit: true,
    allowFontScaling: true,
  },
  variants: textVariants.reduce(
    (a, v) => ({
      ...a,
      [v.charAt(4).toLowerCase() + v.slice(5)]: ({ colorMode }: ComponentParams) => ({
        style: { color: colors[colorMode][v] },
      }),
    }),
    {}
  ),
};
