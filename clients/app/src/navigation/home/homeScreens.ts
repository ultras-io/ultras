import Home from 'screens/Home';
import Match from 'screens/Match';
import Event from 'screens/Event';

import type {HomeNavigationScreens} from '../types';

export const TAB_NAME = 'Home';

const SCREENS: HomeNavigationScreens = {
  home: {
    name: 'Home',
    component: Home,
  },
  match: {
    name: 'Match',
    component: Match,
  },
  event: {
    name: 'Event',
    component: Event,
  },
};

export default SCREENS;
