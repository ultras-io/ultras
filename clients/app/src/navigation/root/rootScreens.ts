import Intro from '../../screens/Intro';
import JoinUs from '../../screens/JoinUs';
import TabNavigation from '../tab/tabNavigation';

import type {RootNavigationScreens} from '../types';

const SCREENS: RootNavigationScreens = {
  intro: {
    name: 'Intro',
    component: Intro,
  },
  joinUs: {
    name: 'JoinUs',
    component: JoinUs,
  },
  tabNavigation: {
    name: 'TabNavigation',
    component: TabNavigation,
  },
};

export default SCREENS;
