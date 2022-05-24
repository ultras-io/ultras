import { extendTheme, Theme as NativeBaseThemeInterface } from 'native-base';
import optionsFontConfig from './options/fontConfigs';
import optionsFontSizes from './options/fontSizes';

const theme = extendTheme<Partial<NativeBaseThemeInterface>>({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },

  fontConfig: optionsFontConfig,
  fontSizes: optionsFontSizes,
});

export default theme;

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
