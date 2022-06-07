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

const useTheme = () => {
  const customColors: ColorType = useColorModeValue(colors.light, colors.dark);
  const nativeBaseTheme = useNativeBaseTheme();

  const { colorMode, toggleColorMode, setColorMode } = useColorMode();

  return {
    colors: customColors,
    lightColors: colors.light,
    darkColors: colors.dark,
    theming: nativeBaseTheme,
    toggleColorMode: toggleColorMode,
    setColorMode: setColorMode,
    isDarkMode: colorMode === 'dark',
  };
};

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <NativeBaseProvider config={configs} theme={theme}>
      {children}
    </NativeBaseProvider>
  );
};

export { ThemeProvider, useTheme, useColorModeValue };
