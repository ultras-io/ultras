import React from 'react';

import Intro from 'views/screens/Intro';
import JoinUs from 'views/screens/JoinUs';
import SearchListModal from 'views/screens/SearchListModal';
import UIKit from 'views/screens/UIKit';

import TabNavigation from '../TabNavigation';

import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';
import styles from 'styles/styles';

import type { RootNavigationScreens } from '../types';

const SCREENS: RootNavigationScreens = {
  intro: {
    name: 'Intro',
    component: Intro,
  },
  joinUs: {
    name: 'JoinUs',
    component: JoinUs,
    options: {
      headerShown: true,
      headerBackVisible: false,
      headerShadowVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.headerTitle} color={'text'}>
          {I18n.t('joinUs')}
        </UltrasText>
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
