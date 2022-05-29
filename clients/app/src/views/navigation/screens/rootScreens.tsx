import React from 'react';
import TabNavigation from '../TabNavigation';
import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';
import styles from 'styles/styles';
import type { RootNavigationScreens } from '../types';

const Intro = React.lazy(() => import('views/screens/Intro'));
const JoinUs = React.lazy(() => import('views/screens/JoinUs'));
const SearchListModal = React.lazy(() => import('views/screens/SearchListModal'));
const UIKit = React.lazy(() => import('views/screens/UIKit'));

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
        <UltrasText style={styles.headerTitle} color="textHeader">
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
