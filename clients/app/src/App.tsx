import React from 'react';
import { ThemeProvider } from 'themes';
import {
  configureBackgroundMode,
  configureInAppMode,
  requestUserPermission,
} from 'notifications';
import AppContainer from 'views/AppContainer';

// import moment from 'moment';
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

configureBackgroundMode();

const App = () => {
  React.useEffect(() => {
    requestUserPermission();
    return configureInAppMode();
  }, []);

  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
};

export default App;
