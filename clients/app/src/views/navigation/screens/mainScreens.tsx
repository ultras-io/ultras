import React from 'react';
import { Text } from 'native-base';
import commonScreens from './commonScreens';
import I18n from 'i18n/i18n';
import { ScreenNavigationConfig } from '../types';

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
            <Text variant={'logoSmall'} flex={1}>
              ultras
            </Text>
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
            <Text variant={'sectionTitle'} flex={1} ml={'3'}>
              {I18n.t('matches')}
            </Text>
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
            <Text variant={'sectionTitle'} flex={1} ml={'3'}>
              {I18n.t('events')}
            </Text>
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
            <Text variant={'sectionTitle'} flex={1} ml={'3'}>
              {I18n.t('settings')}
            </Text>
          ),
        },
      },
      {
        name: screenSettings.notifications,
        component: Notifications,
        options: {
          headerTitle: () => (
            <Text variant={'sectionTitle'} flex={1} ml={'3'}>
              {I18n.t('notifications')}
            </Text>
          ),
        },
      },
      ...commonScreensMap,
    ],
  },
};

export default SCREENS;
