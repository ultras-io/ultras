import React from 'react';

import Home from 'views/screens/Home';

import UltrasText from 'views/components/base/UltrasText';

import styles from 'styles/styles';
import type {HomeNavigationScreens} from '../types';

export const TAB_NAME = 'Home';

const SCREENS: HomeNavigationScreens = {
  home: {
    name: 'Home',
    component: Home,
    options: {
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.headerLogo} color="primary">
          ultras
        </UltrasText>
      ),
    },
  },
};

export default SCREENS;
