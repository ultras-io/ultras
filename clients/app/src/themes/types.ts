// export type ColorCommonKey =
//   | 'transparent'
//   | 'white'
//   | 'black'
//   | 'lightGray'
//   | 'darkGray'
//   | 'gray'
//   | 'success'
//   | 'danger'
//   | 'cardSilverBackground'
//   | 'navigationTabInactive'
//   | 'navigationTabActive'
//   | 'navigationTabBackground';

export type ColorKey =
  | 'transparent'
  | 'iconPrimary'
  | 'iconSecondary'
  | 'iconNavigation'
  | 'iconNotification'
  | 'iconVerified'
  | 'backgroundMain'
  | 'backgroundCard'
  | 'backgroundCardInvert'
  | 'backgroundTabBar'
  | 'backgroundInput'
  | 'backgroundMessageSent'
  | 'backgroundMessageReceived'
  | 'backgroundMessageWarning'
  | 'backgroundLogo'
  | 'backgroundDivider'
  | 'buttonPrimary'
  | 'buttonSecondary'
  | 'buttonAction'
  | 'buttonActionInvert'
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
  | 'textSeptenaryInvert';

// export type ColorKey = ColorCommonKey | ColorThemeKey;

export type ColorGroup<T extends string> = Record<T, string>;

export type ColorType = ColorGroup<ColorKey>;
