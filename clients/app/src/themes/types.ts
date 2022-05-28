export type ColorCommonKey =
  | 'transparent'
  | 'white'
  | 'black'
  | 'lightGray'
  | 'darkGray'
  | 'gray'
  | 'success'
  | 'danger'
  | 'navigationTabInactive'
  | 'navigationTabActive'
  | 'navigationTabBackground';

export type ColorThemeKey =
  | 'screenBackground'
  | 'headerBackground'
  | 'headerTitle'
  | 'headerNavigationButton'
  | 'headerButton'
  | 'textPrimary'
  | 'textSecondary'
  | 'sectionTitle'
  | 'sectionDetails'
  | 'cardSilverBackground'
  | 'cardBackground';

export type ColorKey = ColorCommonKey | ColorThemeKey;

export type ColorGroup<T extends string> = Record<T, string>;

export type ColorType = ColorGroup<ColorKey>;
