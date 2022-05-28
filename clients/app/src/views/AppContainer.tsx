import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from 'views/navigation/RootNavigation';
import { useTheme } from 'themes';

const AppContainer: React.FC = () => {
  const { colors, isDarkMode, setColorMode } = useTheme();

  // useEffect(() => {
  //   // @TODO: set initial color mode from storage
  //   setColorMode('dark');

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      setColorMode(isDarkMode ? 'light' : 'dark');
    }, 10_000);

    return () => {
      clearTimeout(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode]);

  return (
    <>
      <StatusBar
        barStyle={!isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={colors.headerBackground}
      />

      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
