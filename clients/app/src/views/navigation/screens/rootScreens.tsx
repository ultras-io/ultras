import React from 'react';
import { Text } from 'native-base';
import TabNavigation from '../TabNavigation';
import I18n from 'i18n/i18n';
import type { RootNavigationScreens } from '../types';

import Intro from 'views/screens/Intro';
import JoinUs from 'views/screens/JoinUs';
import SearchListModal from 'views/screens/SearchListModal';
import PrivacyPolicy from 'views/screens/PrivacyPolicy';

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
        <Text variant={'title'} flex={1} ml={'4'}>
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
  privacy: {
    name: 'Privacy Policy',
    component: PrivacyPolicy,
    options: {
      presentation: 'modal',
    },
  },
  tabNavigation: {
    name: 'TabNavigation',
    component: TabNavigation,
  },
};

export default SCREENS;
