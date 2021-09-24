import Profile from 'screens/Profile';
import Settings from 'screens/Settings';

import type {ProfileNavigationScreens} from '../types';

export const TAB_NAME = 'Profile';

const SCREENS: ProfileNavigationScreens = {
  profile: {
    name: 'Profile',
    component: Profile,
  },
  settings: {
    name: 'Settings',
    component: Settings,
  },
};

export default SCREENS;
