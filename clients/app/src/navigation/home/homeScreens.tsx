import React from 'react';

import Home from 'views/screens/Home';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
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
      headerTitle: () => (
        <UltrasText style={styles.headerLogo} color="primary">
          ultras
        </UltrasText>
      ),
    },
  },
  supportersClub: {
    name: 'SupportersClub',
    component: SupportersClub,
    options: {
      headerTitle: '',
      headerBackTitle: '',
    },
  },
  supportersClubAbout: {
    name: 'SupportersClubAbout',
    component: SupportersClubAbout,
    options: {
      headerShown: false,
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
