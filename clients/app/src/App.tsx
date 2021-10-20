import React from 'react';
import {StatusBar} from 'react-native';
// import moment from 'moment';
import {ThemeProvider} from 'styled-components';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from 'navigation/root/rootNavigation';
import {theme} from 'themes';

const App = () => {
  // TODO locales
  // moment.locale('en', {
  //   relativeTime: {
  //     future: 'in %s',
  //     past: '%s առաջ',
  //     s: 'a few seconds',
  //     ss: '%d seconds',
  //     m: 'a minute',
  //     mm: '%d minutes',
  //     h: 'an hour',
  //     hh: '%d hours',
  //     d: 'օր',
  //     dd: '%d օր',
  //     w: 'a week',
  //     ww: '%d weeks',
  //     M: 'a month',
  //     MM: '%d months',
  //     y: 'a year',
  //     yy: '%d years',
  //   },
  // });
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.dark} />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
