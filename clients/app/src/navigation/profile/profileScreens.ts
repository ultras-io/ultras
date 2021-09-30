import Profile from '../../views/screens/Profile';
import Settings from '../../views/screens/Settings';

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
