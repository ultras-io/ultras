import React from 'react';
import HomeNavigation from '../home/homeNavigation';
import SearchNavigation from '../search/searchNavigation';
import MatchesNavigation from '../matches/matchesNavigation';
import EventsNavigation from '../events/eventsNavigation';
import ProfileNavigation from '../profile/profileNavigation';

import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from 'assets/icons';

import type {TabNavigationScreens} from '../types';

const SCREENS: TabNavigationScreens = {
  home: {
    name: 'Home',
    component: HomeNavigation,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <Icon
          name={Icons.Home}
          size={24}
          color={focused ? 'secondary' : 'secondaryText'}
        />
      ),
    },
  },
  search: {
    name: 'Search',
    component: SearchNavigation,
    options: {
      tabBarIcon: ({focused}: {focused: boolean}) => (
        <Icon
          name={Icons.Search}
          size={24}
          color={focused ? 'secondary' : 'secondaryText'}
        />
      ),
    },
  },
  matches: {
    name: 'Matches',
    component: MatchesNavigation,
  },
  events: {
    name: 'Events',
    component: EventsNavigation,
  },
  profile: {
    name: 'Profile',
    component: ProfileNavigation,
  },
};

export default SCREENS;
