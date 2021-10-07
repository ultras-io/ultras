import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from 'navigation/root/rootNavigation';
import {theme} from 'themes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
