import React from 'react';
import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

import Settings from 'views/screens/Settings';
import Notifications from 'views/screens/Notifications';

import type {ProfileNavigationScreens} from '../types';
import styles from 'styles/styles';

export const TAB_NAME = 'Profile';

const SCREENS: ProfileNavigationScreens = {
  settings: {
    name: 'Settings',
    component: Settings,
    options: {
      headerTitle: () => (
        <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
          {I18n.t('settings')}
        </UltrasText>
      ),
    },
  },
  notifications: {
    name: 'Notifications',
    component: Notifications,
    options: {
      headerTitle: () => (
        <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
          {I18n.t('notifications')}
        </UltrasText>
      ),
    },
  },
};

export default SCREENS;
