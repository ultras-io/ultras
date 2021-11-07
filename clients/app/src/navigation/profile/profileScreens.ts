import Settings from 'views/screens/Settings';

import type {ProfileNavigationScreens} from '../types';

export const TAB_NAME = 'Profile';

const SCREENS: ProfileNavigationScreens = {
  settings: {
    name: 'Settings',
    component: Settings,
  },
};

export default SCREENS;
