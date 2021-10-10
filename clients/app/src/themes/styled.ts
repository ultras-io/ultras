import 'styled-components';

export type ColorKey =
  | 'backgroundColor'
  | 'boxBackgroundColor'
  | 'backgroundColorOpacity'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'darkText'
  | 'lightText'
  | 'lightText2'
  | 'tint'
  | 'transparent';

declare module 'styled-components' {
  export interface ThemeInterface {
    colors: {
      backgroundColor: string;
      boxBackgroundColor: string;
      backgroundColorOpacity: string;
      primary: string;
      secondary: string;
      danger: string;
      darkText: string;
      lightText: string;
      lightText2: string;
      tint: string;
      transparent: string;
    };
  }
}
