import { ColorType } from '../types';

// dark mode
const dark: ColorType = {
  transparent: 'transparent',

  iconPrimary: 'rgba(255, 255, 255, 1)',
  iconPrimaryInvert: 'rgba(0, 0, 0, 1)',
  iconSecondary: 'rgba(255, 255, 255, 0.8)',
  iconNavigation: '#AB9760',
  iconNotification: '#E54D00',
  iconVerified: '#47C471',

  backgroundMain: '#272829',
  backgroundActionSheet: '#323334',
  backgroundTabBar: 'rgba(39, 40, 41, 0.9)',
  backgroundCard: 'rgba(255, 255, 255, 0.1)',
  backgroundCardInvert: 'rgba(255, 255, 255, 0.85)',
  backgroundInput: 'rgba(255, 255, 255, 0.1)',
  backgroundInputInvert: 'rgba(255, 255, 255,1)',
  backgroundMessageSent: 'rgba(255, 255, 255, 0.2)',
  backgroundMessageReceived: 'rgba(255, 255, 255, 0.85)',
  backgroundMessageWarning: '#917935',
  backgroundLogo: 'rgba(240, 240, 240, 1)',
  backgroundDivider: 'rgba(255, 255, 255, 1)',
  backgroundDividerTransparent: 'rgba(125, 125, 125, 0.5)',

  buttonPrimary: '#AB9760',
  buttonPrimaryPressed: 'rgba(171, 151, 96, 0.8)',
  buttonPrimaryDisabled: 'rgba(171, 151, 96, 0.2)',
  buttonSecondary: 'rgba(0, 0, 0, 0.3)',
  buttonSecondaryPressed: 'rgba(0, 0, 0, 0.25)',
  buttonSecondaryDisabled: 'rgba(0, 0, 0, 0.15)',
  buttonSecondaryInvert: 'rgba(255, 255, 255, 0.8)',
  buttonSecondaryInvertPressed: 'rgba(255, 255, 255, 0.6)',
  buttonAction: 'rgba(255, 255, 255, 1)',
  buttonActionPressed: 'rgba(255, 255, 255, 0.8)',
  buttonActionDisabled: 'rgba(255, 255, 255, 0.2)',
  buttonActionInvert: 'rgba(71, 196, 113, 1)',
  buttonActionInvertPressed: 'rgba(71, 196, 113, 0.8)',
  buttonActionInvertDisabled: 'rgba(71, 196, 113, 0.2)',

  textHeader: '#AB9760',
  textSectionHeader: '#EDE4CC',
  textAction: '#F8CF5A',
  textLink: '#06c',
  textPrimary: 'rgba(255, 255, 255, 1)',
  textSecondary: 'rgba(255, 255, 255, 0.9)',
  textTertiary: 'rgba(255, 255, 255, 0.8)',
  textQuaternary: 'rgba(255, 255, 255, 0.7)',
  textQuinary: 'rgba(255, 255, 255, 0.6)',
  textSenary: 'rgba(255, 255, 255, 0.5)',
  textSeptenary: 'rgba(255, 255, 255, 0.4)',
  textPrimaryInvert: 'rgba(0, 0, 0, 1)',
  textSecondaryInvert: 'rgba(0, 0, 0, 0.9)',
  textTertiaryInvert: 'rgba(0, 0, 0, 0.8)',
  textQuaternaryInvert: 'rgba(0, 0, 0, 0.7)',
  textQuinaryInvert: 'rgba(0, 0, 0, 0.6)',
  textSenaryInvert: 'rgba(0, 0, 0, 0.5)',
  textSeptenaryInvert: 'rgba(0, 0, 0, 0.4)',

  dotIndicatorActive: 'rgba(142, 142, 147, 0.8)',
  dotIndicator: 'rgba(142, 142, 147, 0.3)',
};

// dark mode
const light = dark;

export default {
  dark,
  light,
};
