import I18n from 'i18n/i18n';
import type { SearchTabScreens } from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  teams: {
    name: 'Teams',
    tabName: I18n.t('teams'),
  },
  fanClubs: {
    name: 'FanClubs',
    tabName: I18n.t('fanClubs'),
  },
};

export default SCREENS;
