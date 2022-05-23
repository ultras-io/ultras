import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from 'views/navigation/RootNavigation';
import { useTheme } from 'themes';

const AppContainer: React.FC = () => {
  const theme = useTheme();
  const statusBarStyle = !theme.isDarkMode ? 'dark-content' : 'light-content';

  return (
    <>
      <StatusBar backgroundColor={theme.colors.bgColor} barStyle={statusBarStyle} />

      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </>
  );
};

export default AppContainer;
