import React from 'react';
import HomeNavigation from 'views/screens/Home/navigation';
import SearchNavigation from 'views/screens/Search/navigation';
import MatchesNavigation from 'views/screens/Matches/navigation';
import EventsNavigation from 'views/screens/Events/navigation';
import ProfileNavigation from 'views/screens/Profile/navigation';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import type { TabNavigationScreens } from '../types';

const SCREENS: TabNavigationScreens = {
  home: {
    name: 'Home',
    component: HomeNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon name={Icons.Home} color={focused ? 'iconNavigation' : 'iconSecondary'} />
      ),
    },
  },
  search: {
    name: 'Search',
    component: SearchNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon name={Icons.Search} color={focused ? 'iconNavigation' : 'iconSecondary'} />
      ),
    },
  },
  matches: {
    name: 'Matches',
    component: MatchesNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon name={Icons.Match} color={focused ? 'iconNavigation' : 'iconSecondary'} />
      ),
    },
  },
  events: {
    name: 'Events',
    component: EventsNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon name={Icons.Event} color={focused ? 'iconNavigation' : 'iconSecondary'} />
      ),
    },
  },
  profile: {
    name: 'Me',
    component: ProfileNavigation,
    options: {
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon name={Icons.Shirt} color={focused ? 'iconNavigation' : 'iconSecondary'} />
      ),
      // tabBarBadge: '1',
    },
  },
};

export default SCREENS;
