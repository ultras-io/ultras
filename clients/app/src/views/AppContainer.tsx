import React, { useEffect, useMemo } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigation from 'views/navigation/RootNavigation';
import { useTheme } from 'themes';

const AppContainer: React.FC = () => {
  const { colors, setColorMode } = useTheme();

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.backgroundMain,
      },
    }),
    [colors]
  );

  useEffect(() => {
    // @TODO: set initial color mode from storage
    setColorMode('dark');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default AppContainer;
