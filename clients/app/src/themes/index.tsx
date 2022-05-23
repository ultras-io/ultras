import React from 'react';
import {
  NativeBaseProvider,
  useColorMode,
  useColorModeValue,
  useTheme as useNativeBaseTheme,
} from 'native-base';
import { ColorType } from './types';

import configs from './theming/configs';
import theme from './theming/theme';
import colors from './theming/colors';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
declare module 'styled-components' {
  export interface ThemeInterface {
    colors: ColorType;
  }
}

export const styledThemeLight = {
  colors: colors.light,
};
export const styledThemeDark = {
  colors: colors.dark,
};

const useTheme = () => {
  const customColors: ColorType = useColorModeValue(colors.light, colors.dark);
  const nativeBaseTheme = useNativeBaseTheme();

  const { colorMode, toggleColorMode } = useColorMode();

  return {
    colors: customColors,
    theming: nativeBaseTheme,
    toggle: toggleColorMode,
    isDarkMode: colorMode === 'dark',
  };
};

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <NativeBaseProvider config={configs} theme={theme}>
      <StyledThemeProvider theme={styledThemeDark}>
        <>{children}</>
      </StyledThemeProvider>
    </NativeBaseProvider>
  );
};

export { ThemeProvider, useTheme, useColorModeValue };
