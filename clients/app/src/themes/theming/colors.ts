import { ColorType } from '../types';

// dark mode
const dark: ColorType = {
  transparent: 'transparent',

  iconPrimary: 'rgba(255, 255, 255, 1)',
  iconSecondary: 'rgba(255, 255, 255, 0.8)',
  iconNavigation: '#AB9760',
  iconNotification: '#E54D00',
  iconVerified: '#47C471',

  backgroundMain: '#272829',
  backgroundTabBar: 'rgba(39, 40, 41, 0.9)',
  backgroundCard: 'rgba(255, 255, 255, 0.1)',
  backgroundCardInvert: 'rgba(255, 255, 255, 0.85)',
  backgroundInput: 'rgba(255, 255, 255, 0.1)',
  backgroundMessageSent: 'rgba(255, 255, 255, 0.2)',
  backgroundMessageReceived: 'rgba(255, 255, 255, 0.85)',
  backgroundMessageWarning: '#917935',
  backgroundLogo: 'rgb(255, 255, 255)',
  backgroundDivider: 'rgb(255, 255, 255, .2)',

  buttonPrimary: '#AB9760',
  buttonSecondary: 'rgba(0, 0, 0, 0.3)',
  buttonAction: 'rgb(255, 255, 255)',
  buttonActionInvert: '#47C471',

  textHeader: '#AB9760',
  textSectionHeader: '#EDE4CC',
  textAction: '#F8CF5A',
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
};

// dark mode
const light = dark;

export default {
  dark,
  light,
};
