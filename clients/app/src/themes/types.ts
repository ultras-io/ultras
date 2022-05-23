export type ColorKey =
  | 'bgColor'
  | 'bgColorInvert'
  | 'bgColorLight'
  | 'bgColorLightSecondary'
  | 'opacityBgColor'
  | 'opacityBgColorInvert'
  | 'transparent'
  | 'success'
  | 'danger'
  | 'dark'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'primaryInactive'
  | 'androidBlurColor'
  | 'text'
  | 'secondaryText'
  | 'tertiaryText'
  | 'quaternaryText'
  | 'textInvert'
  | 'secondaryTextInvert'
  | 'tertiaryTextInvert'
  | 'quaternaryTextInvert';

export type ColorType = {
  [key in ColorKey]: string;
};
