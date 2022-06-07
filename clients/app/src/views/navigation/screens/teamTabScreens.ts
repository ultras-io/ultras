import I18n from 'i18n/i18n';
import type { TeamTabScreens } from '../types';

export const TAB_NAME = 'TeamTabs';

const SCREENS: TeamTabScreens = {
  matches: {
    name: 'Matches',
    tabName: I18n.t('matches'),
  },
  events: {
    name: 'Events',
    tabName: I18n.t('events'),
  },
};

export default SCREENS;
