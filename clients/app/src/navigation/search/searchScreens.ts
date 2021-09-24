import Search from 'screens/Search';

import type {SearchNavigationScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchNavigationScreens = {
  search: {
    name: 'Search',
    component: Search,
  },
};

export default SCREENS;
