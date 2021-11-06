import React from 'react';

import commonScreens from '../commonScreens';

import Home from 'views/screens/Home';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Team from 'views/screens/Team';

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
    name: commonScreens.supportersClub,
    component: SupportersClub,
    options: {
      headerTitle: '',
      headerBackTitle: '',
    },
  },
  supportersClubAbout: {
    name: commonScreens.supportersClubAbout,
    component: SupportersClubAbout,
    options: {
      headerShown: false,
    },
  },
  match: {
    name: commonScreens.match,
    component: Match,
    options: {
      headerTitle: '',
    },
  },
  event: {
    name: commonScreens.event,
    component: Event,
  },
  team: {
    name: commonScreens.team,
    component: Team,
    options: {
      headerTitle: '',
      headerBackTitle: '',
    },
  },
};

export default SCREENS;
