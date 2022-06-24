import React from 'react';
import { Text } from 'native-base';
import commonScreens from './commonScreens';
import profileScreens from './profileScreens';
import I18n from 'i18n/i18n';
import { ScreenNavigationConfig } from '../types';

import Home from 'views/screens/Home';
import Search from 'views/screens/Search';
import Events from 'views/screens/Events';
import Matches from 'views/screens/Matches';

// @TODO complete list, change all names using in pushTo
const screenSettings = {
  home: 'Home',
  search: 'Search',
  matches: 'Matches',
  events: 'Events',
  profile: 'Profiles',
};

const commonScreensMap = Object.values(commonScreens);
const profileScreensMap = Object.values(profileScreens);

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
    screens: [...profileScreensMap, ...commonScreensMap],
  },
};

export default SCREENS;
