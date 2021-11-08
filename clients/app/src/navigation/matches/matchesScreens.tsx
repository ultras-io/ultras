import React from 'react';
import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

import Matches from 'views/screens/Matches';

import type {MatchesNavigationScreens} from '../types';
import styles from 'styles/styles';

export const TAB_NAME = 'Matches';

const SCREENS: MatchesNavigationScreens = {
  matches: {
    name: 'Matches',
    component: Matches,
    options: {
      headerShown: true,
      headerBackVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.screenTitleLeft} color={'tertiary'}>
          {I18n.t('matches')}
        </UltrasText>
      ),
    },
  },
};

export default SCREENS;
