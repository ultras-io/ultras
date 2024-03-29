import colors from '../colors';
import { ComponentParams } from './types';

export default {
  defaultProps: {
    adjustsFontSizeToFit: true,
    allowFontScaling: true,
    letterSpacing: -0.24,
  },
  variants: {
    logo: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'MontserratAlternates',
        fontSize: '8xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
          letterSpacing: 0,
        },
      };
    },
    logoSmall: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'MontserratAlternates',
        fontSize: '7xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textHeader,
          letterSpacing: 0,
        },
      };
    },
    subTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        fontWeight: 500,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    title: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'Montserrat',
        fontSize: '7xl',
        fontWeight: 700,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    profileTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'MontserratAlternates',
        fontSize: '2xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textSectionHeader,
        },
      };
    },
    message: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '4xl',
        style: {
          color: colors[colorMode].textTertiaryInvert,
          // letterSpacing: -0.408,
        },
      };
    },
    smallText: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'md',
        style: {
          color: colors[colorMode].textQuinary,
          letterSpacing: 0.12,
        },
      };
    },
    smallTextAction: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'md',
        underline: true,
        style: {
          color: colors[colorMode].textAction,
          letterSpacing: 0.12,
        },
      };
    },
    messageInvert: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '4xl',
        style: {
          color: colors[colorMode].textPrimary,
          // letterSpacing: -0.408,
          textAlign: 'right',
        },
      };
    },
    sectionTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'Montserrat',
        fontSize: '5xl',
        lineHeight: 'sm',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textSectionHeader,
        },
      };
    },
    smallTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        fontWeight: 500,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    smallDescription: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        style: {
          color: colors[colorMode].textSenary,
        },
      };
    },
    cardTime: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'md',
        style: {
          color: colors[colorMode].textTertiary,
        },
      };
    },
    cardTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'Montserrat',
        fontSize: '3xl',
        lineHeight: 'sm',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    cardStats: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        style: {
          color: colors[colorMode].textQuaternary,
        },
      };
    },
    cardPlace: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'lg',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textSecondary,
        },
      };
    },
    cardInfo: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    catch: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'xs',
        fontWeight: 700,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    matchLeagueInvert: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        style: {
          color: colors[colorMode].textTertiaryInvert,
        },
      };
    },
    matchDateInvert: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xs',
        style: {
          color: colors[colorMode].textQuinaryInvert,
        },
      };
    },
    matchTimeInvert: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'sm',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimaryInvert,
        },
      };
    },
    matchTeamInvert: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textTertiaryInvert,
        },
      };
    },
    standard: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        style: {
          color: colors[colorMode].textTertiary,
        },
      };
    },
    info: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'lg',
        fontWeight: 500,
        style: {
          color: colors[colorMode].textSenary,
        },
      };
    },
    matchTeam: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    matchLeague: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'lg',
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    matchDate: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'lg',
        style: {
          color: colors[colorMode].textQuinary,
        },
      };
    },
    matchTime: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '5xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    matchVenue: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: 'xs',
        style: {
          color: colors[colorMode].textQuinary,
        },
      };
    },
    searchTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontFamily: 'Montserrat',
        fontSize: '2xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textSectionHeader,
        },
      };
    },
    link: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        underline: true,
        style: {
          color: colors[colorMode].textLink,
          letterSpacing: -0.408,
        },
      };
    },
    actionSheetTitle: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '5xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
          textAlign: 'center',
        },
      };
    },
    actionSheetItem: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '4xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].textPrimary,
        },
      };
    },
    actionSheetItemNegative: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '4xl',
        fontWeight: 600,
        style: {
          color: '#dc2626',
        },
      };
    },
    actionSheetItemPositive: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '4xl',
        fontWeight: 600,
        style: {
          color: '#10b981',
        },
      };
    },

    errorLabel: ({ colorMode }: ComponentParams) => {
      return {
        fontSize: '2xl',
        fontWeight: 600,
        style: {
          color: colors[colorMode].iconNotification,
        },
      };
    },
  },
};
