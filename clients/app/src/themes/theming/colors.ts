import { ColorType, ColorCommonKey, ColorThemeKey, ColorGroup } from '../types';

// common colors list, that doesn't depends from
// theme color mode
const commonColors: ColorGroup<ColorCommonKey> = {
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  lightGray: 'rgba(0, 0, 0, 0.15)',
  darkGray: 'rgba(0, 0, 0, 0.45)',
  gray: '#777777',
  success: '#47c471',
  danger: '#e54d00',
  cardSilverBackground: 'rgba(255, 255, 255, 0.85)',
  navigationTabInactive: 'rgba(255, 255, 255, 0.7)',
  navigationTabActive: '#ab9760',
  navigationTabBackground: '#272829',
};

// color list for light mode only
const lightColors: ColorGroup<ColorThemeKey> = {
  screenBackground: '#ebedf0',
  screenBackgroundInvert: '#000000',

  headerBackground: '#ffffff',
  headerTitle: '#ab9760',
  headerNavigationButton: '#ab9760',
  headerButton: '#000000',

  textPrimary: '#272829',
  textPrimaryInvert: '#ffffff',
  textSecondary: '#898b8c',
  textActive: '#ab9760',

  sectionTitle: '#ab9760',
  sectionDetails: 'rgba(39, 40, 41, 0.7)',

  cardBackground: '#ffffff',

  inputBackground: '#f2f2f2',
  inputForeground: '#a5a5ac',
  inputForegroundOpacity: '#a5a5ac',

  tabInactive: '#272829',
  tabActive: '#ab9760',

  likeButtonInactive: '#939394',
  likeButtonActive: '#ab9760',
  divider: '#c2c2c2',
  infoBadge: 'rgba(0, 0, 0, 0.8)',
};

// color list for dark mode only
const darkColors: ColorGroup<ColorThemeKey> = {
  screenBackground: '#272829',
  screenBackgroundInvert: '#ffffff',

  headerBackground: '#272829',
  headerTitle: '#ab9760',
  headerNavigationButton: '#f8cf5a',
  headerButton: '#ffffff',

  textPrimary: '#ffffff',
  textPrimaryInvert: '#272829',
  textSecondary: '#939394',
  textActive: '#f8cf5a',

  sectionTitle: '#ede4cc',
  sectionDetails: '#ffffff',

  cardBackground: '#3d3d3e',

  inputBackground: '#3d3d3e',
  inputForeground: '#a5a5ac',
  inputForegroundOpacity: '#a5a5ac',

  tabInactive: 'rgba(255, 255, 255, 0.7)',
  tabActive: '#f8cf5a',

  likeButtonInactive: '#ffffff',
  likeButtonActive: '#f8cf5a',
  divider: '#414243',
  infoBadge: 'rgba(255, 255, 255, 0.8)',
};

// merge and export colors
export const dark: ColorType = {
  ...darkColors,
  ...commonColors,
};

export const light: ColorType = {
  ...lightColors,
  ...commonColors,
};

export default {
  dark,
  light,
};
