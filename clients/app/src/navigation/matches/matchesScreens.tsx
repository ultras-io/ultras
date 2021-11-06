import React from 'react';

import commonScreens from '../commonScreens';

import Matches from 'views/screens/Matches';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import Team from 'views/screens/Team';

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
      headerTitle: () => (
        <UltrasText style={styles.screenTitle} color={'primary'}>
          {I18n.t('matches')}
        </UltrasText>
      ),
    },
  },
  match: {
    name: commonScreens.match,
    component: Match,
    options: {
      headerTitle: '',
    },
  },
  event: {
    name: commonScreens.event,
    component: Event,
  },
  team: {
    name: commonScreens.team,
    component: Team,
    options: {
      headerTitle: '',
      headerBackTitle: '',
    },
  },
};

export default SCREENS;
