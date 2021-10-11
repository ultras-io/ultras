import 'styled-components';

export type ColorKey =
  | 'bgColor'
  | 'bgColorInvert'
  | 'opacityBgColor'
  | 'opacityBgColorInvert'
  | 'transparent'
  | 'success'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'primaryInactive'
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
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      primaryInactive: string;
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
