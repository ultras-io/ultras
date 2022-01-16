import React from 'react';

import Home from 'views/screens/Home';
import Search from 'views/screens/Search';
import Events from 'views/screens/Events';
import Matches from 'views/screens/Matches';
import Settings from 'views/screens/Settings';
import Notifications from 'views/screens/Notifications';

import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import { ScreenNavigationConfig } from './types';
import styles from 'styles/styles';

const SCREENS: ScreenNavigationConfig = {
  home: {
    tabName: 'Home',
    initialScreenName: 'Home',
    screens: [
      {
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
    ],
  },
  search: {
    tabName: 'Search',
    initialScreenName: 'Search',
    screens: [
      {
        name: 'Search',
        component: Search,
        options: {
          headerShown: false,
        },
      },
    ],
  },
  matches: {
    tabName: 'Matches',
    initialScreenName: 'Matches',
    screens: [
      {
        name: 'Matches',
        component: Matches,
        options: {
          headerShown: true,
          headerBackVisible: false,
          headerTitle: () => (
            <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
              {I18n.t('matches')}
            </UltrasText>
          ),
        },
      },
    ],
  },
  events: {
    tabName: 'Events',
    initialScreenName: 'Events',
    screens: [
      {
        name: 'Events',
        component: Events,
        options: {
          headerShown: true,
          headerBackVisible: false,
          headerTitle: () => (
            <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
              {I18n.t('events')}
            </UltrasText>
          ),
        },
      },
    ],
  },
  profile: {
    tabName: 'Profile',
    initialScreenName: 'Profile',
    screens: [
      {
        name: 'Settings',
        component: Settings,
        options: {
          headerTitle: () => (
            <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
              {I18n.t('settings')}
            </UltrasText>
          ),
        },
      },
      {
        name: 'Notifications',
        component: Notifications,
        options: {
          headerTitle: () => (
            <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
              {I18n.t('notifications')}
            </UltrasText>
          ),
        },
      },
    ],
  },
};

// @TODO complete list, make usage for SCREENS, change all names using in pushTo
export const screenSettings = {
  settings: 'Settings',
  notifications: 'Notifications',
};

export default SCREENS;
