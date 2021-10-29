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
      headerBackVisible: false,
      headerShadowVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.screenTitle} color="primary">
          ultras
        </UltrasText>
      ),
      headerRight: () => <UltrasText color="text">b1 b2</UltrasText>,
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
