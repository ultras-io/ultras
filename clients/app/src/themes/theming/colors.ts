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
  navigationTabInactive: 'rgba(255, 255, 255, 0.7)',
  navigationTabActive: '#ab9760',
  navigationTabBackground: '#272829',
};

// color list for light mode only
const lightColors: ColorGroup<ColorThemeKey> = {
  screenBackground: '#ebedf0',

  headerBackground: '#ffffff',
  headerTitle: '#ab9760',
  headerNavigationButton: '#ab9760',
  headerButton: '#ab9760',

  textPrimary: '#272829',
  textSecondary: 'rgba(39, 40, 41, 0.5)',

  sectionTitle: '#ab9760',
  sectionDetails: 'rgba(39, 40, 41, 0.7)',

  cardSilverBackground: 'rgba(255, 255, 255, 0.85)',
  cardBackground: '#ffffff',
};

// color list for dark mode only
const darkColors: ColorGroup<ColorThemeKey> = {
  screenBackground: '#272829',

  headerBackground: '#272829',
  headerTitle: '#ab9760',
  headerNavigationButton: '#F8CF5A',
  headerButton: '#ffffff',

  textPrimary: '#ffffff',
  textSecondary: 'rgba(39, 40, 41, 0.5)',

  sectionTitle: '#ede4cc',
  sectionDetails: '#ffffff',

  cardSilverBackground: 'rgba(255, 255, 255, 0.85)',
  cardBackground: '#272829',
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
