import 'styled-components';

export type ColorKey =
  | 'bgColor'
  | 'bgColorInvert'
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

declare module 'styled-components' {
  export interface ThemeInterface {
    colors: {
      bgColor: string;
      bgColorInvert: string;
      opacityBgColor: string;
      opacityBgColorInvert: string;
      transparent: string;
      success: string;
      danger: string;
      dark: string;
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      primaryInactive: string;
      androidBlurColor: string;
      text: string;
      secondaryText: string;
      tertiaryText: string;
      quaternaryText: string;
      textInvert: string;
      secondaryTextInvert: string;
      tertiaryTextInvert: string;
      quaternaryTextInvert: string;
    };
  }
}
