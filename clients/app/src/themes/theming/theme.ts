import { extendTheme, Theme as NativeBaseThemeInterface } from 'native-base';

const theme = extendTheme<Partial<NativeBaseThemeInterface>>({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
