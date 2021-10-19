import React from 'react';

import Matches from 'views/screens/Matches';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';

import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

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
      headerShadowVisible: false,
      headerTitle: () => (
        <UltrasText style={styles.screenTitle} color={'tertiary'}>
          {I18n.t('matches')}
        </UltrasText>
      ),
    },
  },
  match: {
    name: 'Match',
    component: Match,
  },
  event: {
    name: 'Event',
    component: Event,
  },
};

export default SCREENS;
