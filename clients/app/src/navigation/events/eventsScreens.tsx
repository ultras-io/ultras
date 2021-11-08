import React from 'react';
import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

import Events from 'views/screens/Events';

import type {EventsNavigationScreens} from '../types';
import styles from 'styles/styles';

export const TAB_NAME = 'Events';

const SCREENS: EventsNavigationScreens = {
  events: {
    name: 'Events',
    component: Events,
    options: {
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
          {I18n.t('events')}
        </UltrasText>
      ),
    },
  },
};

export default SCREENS;
