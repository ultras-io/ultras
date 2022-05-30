import { extendTheme } from 'native-base';
import optionsFontConfig from './options/fontConfigs';
import optionsFontSizes from './options/fontSizes';
import optionsSpaces from './options/spaces';
import * as components from './components';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fontConfig: optionsFontConfig,
  fontSizes: optionsFontSizes,
  fonts: {
    Montserrat: 'Montserrat',
    MontserratAlternates: 'MontserratAlternates',
  },
  space: optionsSpaces,
  components,
});

export default theme;

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
