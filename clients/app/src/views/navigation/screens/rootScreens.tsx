import React from 'react';
import { Text } from 'native-base';
import TabNavigation from '../TabNavigation';
import I18n from 'i18n/i18n';
import type { RootNavigationScreens } from '../types';

import Intro from 'views/screens/Intro';
import JoinUs from 'views/screens/JoinUs';
import SearchListModal from 'views/screens/SearchListModal';
import UIKit from 'views/screens/UIKit';

const SCREENS: RootNavigationScreens = {
  intro: {
    name: 'Intro',
    component: Intro,
    options: {},
  },
  joinUs: {
    name: 'JoinUs',
    component: JoinUs,
    options: {
      headerShown: true,
      headerBackVisible: false,
      headerShadowVisible: false,
      headerTitle: () => (
        <Text variant={'title'} flex={1}>
          {I18n.t('joinUs')}
        </Text>
      ),
    },
  },
  searchListModal: {
    name: 'SearchList',
    component: SearchListModal,
    options: {
      presentation: 'modal',
    },
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
