import React from 'react';
import { ThemeProvider } from 'themes';
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

const globalAny = global as any;

// eslint-disable-next-line no-console
console.log(
  '>>> JS Engine:',
  globalAny.HermesInternal ? 'Hermes' : globalAny.__v8runtime ? 'V8' : 'JSC'
);

const App = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
};

export default App;
