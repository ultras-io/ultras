export type ColorCommonKey =
  | 'transparent'
  | 'white'
  | 'black'
  | 'lightGray'
  | 'darkGray'
  | 'gray'
  | 'success'
  | 'danger'
  | 'cardSilverBackground'
  | 'navigationTabInactive'
  | 'navigationTabActive'
  | 'navigationTabBackground';

export type ColorThemeKey =
  | 'screenBackground'
  | 'screenBackgroundInvert'
  | 'headerBackground'
  | 'headerTitle'
  | 'headerNavigationButton'
  | 'headerButton'
  | 'textPrimary'
  | 'textPrimaryInvert'
  | 'textSecondary'
  | 'textActive'
  | 'sectionTitle'
  | 'sectionDetails'
  | 'cardBackground'
  | 'inputBackground'
  | 'inputForeground'
  | 'inputForegroundOpacity'
  | 'tabInactive'
  | 'tabActive'
  | 'likeButtonInactive'
  | 'likeButtonActive'
  | 'divider'
  | 'infoBadge';

export type ColorKey = ColorCommonKey | ColorThemeKey;

export type ColorGroup<T extends string> = Record<T, string>;

export type ColorType = ColorGroup<ColorKey>;
