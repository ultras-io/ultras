import Search from '../../views/screens/Search';
import Event from '../../views/screens/Event';
import Match from '../../views/screens/Match';

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
