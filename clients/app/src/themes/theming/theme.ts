import { extendTheme } from 'native-base';
import optionsFontConfig from './options/fontConfigs';
import optionsFontSizes from './options/fontSizes';
import optionsSpaces from './options/spaces';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },

  fontConfig: optionsFontConfig,
  fontSizes: optionsFontSizes,
  space: optionsSpaces,
});

export default theme;

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
