import React from 'react';

import Home from 'views/screens/Home';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';

import UltrasText from 'views/components/base/UltrasText';
import styles from 'styles/styles';

import type {HomeNavigationScreens} from '../types';

export const TAB_NAME = 'Home';

const SCREENS: HomeNavigationScreens = {
  home: {
    name: 'Home',
    component: Home,
    options: {
      headerShown: true,
      headerLeft: () => <></>,
      headerTitle: () => (
        <UltrasText style={styles.headerLogo} color={'lightText'}>
          ultras
        </UltrasText>
      ),
      headerRight: () => <UltrasText color={'lightText'}>b1 b2</UltrasText>,
      headerShadowVisible: false,
    },
  },
  match: {
    name: 'Match',
    component: Match,
  },
  event: {
    name: 'Event',
    component: Event,
  },
};

export default SCREENS;
