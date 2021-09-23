import HomeNavigation from '../home/homeNavigation';
import SearchNavigation from '../search/searchNavigation';
import MatchesNavigation from '../matches/matchesNavigation';
import EventsNavigation from '../events/eventsNavigation';
import ProfileNavigation from '../profile/profileNavigation';

import type {TabNavigationScreens} from '../types';

const SCREENS: TabNavigationScreens = {
  home: {
    name: 'Home',
    component: HomeNavigation,
  },
  search: {
    name: 'Search',
    component: SearchNavigation,
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
