import React from 'react';
import I18n from 'i18n/i18n';

const MatchesContainer = React.lazy(
  () => import('views/screens/Matches/containers/MatchesContainer')
);
const EventsContainer = React.lazy(
  () => import('views/screens/Events/containers/EventsContainer')
);

import type { TeamTabScreens } from '../types';

export const TAB_NAME = 'TeamTabs';

const SCREENS: TeamTabScreens = {
  matches: {
    name: 'Matches',
    tabName: I18n.t('matches'),
    component: MatchesContainer,
  },
  events: {
    name: 'Events',
    tabName: I18n.t('events'),
    component: EventsContainer,
  },
};

export default SCREENS;
