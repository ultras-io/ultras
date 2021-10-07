import 'styled-components';

export type ColorKey =
  | 'backgroundColor'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'darkText'
  | 'lightText'
  | 'tint'
  | 'transparent';

declare module 'styled-components' {
  export interface ThemeInterface {
    colors: {
      backgroundColor: string;
      primary: string;
      secondary: string;
      danger: string;
      darkText: string;
      lightText: string;
      tint: string;
      transparent: string;
    };
  }
}
