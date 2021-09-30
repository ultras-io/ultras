import Intro from 'views/screens/Intro';
import JoinUs from 'views/screens/JoinUs';
import UIKit from 'views/screens/UIKit';
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
  uikit: {
    name: 'UIKit',
    component: UIKit,
  },
  tabNavigation: {
    name: 'TabNavigation',
    component: TabNavigation,
  },
};

export default SCREENS;
