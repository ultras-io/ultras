import Search from 'views/screens/Search';
import SupportersClub from 'views/screens/SupportersClub';
import SupportersClubAbout from 'views/screens/SupportersClubAbout';
import Event from 'views/screens/Event';
import Match from 'views/screens/Match';

import type {SearchNavigationScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchNavigationScreens = {
  search: {
    name: 'Search',
    component: Search,
  },
  supportersClub: {
    name: 'SupportersClub',
    component: SupportersClub,
    options: {
      headerTitle: '',
      headerBackTitle: '',
    },
  },
  supportersClubAbout: {
    name: 'SupportersClubAbout',
    component: SupportersClubAbout,
    options: {
      headerShown: false,
    },
  },
  event: {
    name: 'Event',
    component: Event,
  },
  match: {
    name: 'Match',
    component: Match,
  },
};

export default SCREENS;
