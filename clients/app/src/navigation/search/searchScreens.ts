import Search from 'screens/Search';
import Event from 'screens/Event';
import Match from 'screens/Match';

import type {SearchNavigationScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchNavigationScreens = {
  search: {
    name: 'Search',
    component: Search,
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
