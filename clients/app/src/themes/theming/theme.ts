import { extendTheme } from 'native-base';
import fontConfig from './options/fontConfigs';
import fontSizes from './options/fontSizes';
import sizes from './options/sizes';
import * as components from './components';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fontConfig,
  fontSizes,
  fonts: {
    Montserrat: 'Montserrat',
    MontserratAlternates: 'MontserratAlternates',
  },
  sizes,
  components,
});

export default theme;

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
