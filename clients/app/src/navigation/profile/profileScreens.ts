import Profile from '../../screens/Profile';
import Settings from '../../screens/Settings';

import type {ProfileNavigationScreens} from '../types';

const SCREENS: ProfileNavigationScreens = {
  profile: {
    name: 'Profile:Profile',
    component: Profile,
  },
  settings: {
    name: 'Profile:Settings',
    component: Settings,
  },
};

export default SCREENS;
