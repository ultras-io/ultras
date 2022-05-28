import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from 'views/navigation/RootNavigation';
import { useTheme } from 'themes';

const AppContainer: React.FC = () => {
  const { isDarkMode, setColorMode } = useTheme();

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
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default AppContainer;
