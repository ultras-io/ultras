import React from 'react';
import HomeNavigation from 'views/screens/Home/navigation';
import SearchNavigation from 'views/screens/Search/navigation';
import MatchesNavigation from 'views/screens/Matches/navigation';
import EventsNavigation from 'views/screens/Events/navigation';
import ProfileNavigation from 'views/screens/Profile/navigation';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import type { TabNavigationScreens } from '../types';

const SCREENS: TabNavigationScreens = {
  home: {
    name: 'Home',
    component: HomeNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon
          name={Icons.Home}
          size={'ic-md'}
          color={focused ? 'iconNavigation' : 'iconSecondary'}
        />
      ),
    },
  },
  search: {
    name: 'Search',
    component: SearchNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon
          name={Icons.Search}
          size={'ic-md'}
          color={focused ? 'iconNavigation' : 'iconSecondary'}
        />
      ),
    },
  },
  matches: {
    name: 'Matches',
    component: MatchesNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon
          name={Icons.Match}
          size={'ic-md'}
          color={focused ? 'iconNavigation' : 'iconSecondary'}
        />
      ),
    },
  },
  events: {
    name: 'Events',
    component: EventsNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon
          name={Icons.Event}
          size={'ic-md'}
          color={focused ? 'iconNavigation' : 'iconSecondary'}
        />
      ),
    },
  },
  profile: {
    name: 'Profile',
    component: ProfileNavigation,
  },
};

export default SCREENS;
