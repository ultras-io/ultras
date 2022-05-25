import React from 'react';
import commonScreens from './commonScreens';
import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';
import { ScreenNavigationConfig } from '../types';
import styles from 'styles/styles';

const Home = React.lazy(() => import('views/screens/Home'));
const Search = React.lazy(() => import('views/screens/Search'));
const Events = React.lazy(() => import('views/screens/Events'));
const Matches = React.lazy(() => import('views/screens/Matches'));
const Settings = React.lazy(() => import('views/screens/Settings'));
const Notifications = React.lazy(() => import('views/screens/Notifications'));

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
