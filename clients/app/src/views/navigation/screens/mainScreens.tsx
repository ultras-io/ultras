import React from 'react';

import Home from 'views/screens/Home';
import Search from 'views/screens/Search';
import Events from 'views/screens/Events';
import Matches from 'views/screens/Matches';
import Settings from 'views/screens/Settings';
import Notifications from 'views/screens/Notifications';
import commonScreens from './commonScreens';

import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';
import { ScreenNavigationConfig } from '../types';
import styles from 'styles/styles';

// @TODO complete list, change all names using in pushTo
const screenSettings = {
  home: 'Home',
  search: 'Search',
  matches: 'Matches',
  events: 'Events',
  profile: 'Profiles',
  settings: 'Settings',
  notifications: 'Notifications',
};

const commonScreensMap = Object.values(commonScreens);

const SCREENS: ScreenNavigationConfig = {
  home: {
    tabName: screenSettings.home,
    initialScreenName: screenSettings.home,
    screens: [
      {
        name: screenSettings.home,
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
      ...commonScreensMap,
    ],
  },
  search: {
    tabName: screenSettings.search,
    initialScreenName: screenSettings.search,
    screens: [
      {
        name: screenSettings.search,
        component: Search,
        options: {
          headerShown: false,
        },
      },
      ...commonScreensMap,
    ],
  },
  matches: {
    tabName: screenSettings.matches,
    initialScreenName: screenSettings.matches,
    screens: [
      {
        name: screenSettings.matches,
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
      ...commonScreensMap,
    ],
  },
  events: {
    tabName: screenSettings.events,
    initialScreenName: screenSettings.events,
    screens: [
      {
        name: screenSettings.events,
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
      ...commonScreensMap,
    ],
  },
  profile: {
    tabName: screenSettings.profile,
    initialScreenName: screenSettings.profile,
    screens: [
      {
        name: screenSettings.settings,
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
        name: screenSettings.notifications,
        component: Notifications,
        options: {
          headerTitle: () => (
            <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
              {I18n.t('notifications')}
            </UltrasText>
          ),
        },
      },
      ...commonScreensMap,
    ],
  },
};

export default SCREENS;
