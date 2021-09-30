import SearchAll from 'views/screens/SearchAll';
import SearchEvent from 'views/screens/SearchEvent';
import SearchTeam from 'views/screens/SearchTeam';

import type {SearchTabScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  all: {
    name: 'All',
    component: SearchAll,
  },
  event: {
    name: 'Events',
    component: SearchEvent,
  },
  team: {
    name: 'Teams',
    component: SearchTeam,
  },
};

export default SCREENS;
