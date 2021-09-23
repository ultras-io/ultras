import Home from '../../screens/Home';
import Match from '../../screens/Match';
import Event from '../../screens/Event';

import type {HomeNavigationScreens} from '../types';

const SCREENS: HomeNavigationScreens = {
  home: {
    name: 'Home:Home',
    component: Home,
  },
  match: {
    name: 'Home:Match',
    component: Match,
  },
  event: {
    name: 'Home:Event',
    component: Event,
  },
};

export default SCREENS;
