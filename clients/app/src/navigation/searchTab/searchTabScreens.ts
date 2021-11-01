import I18n from 'i18n/i18n';

import SearchAll from 'views/screens/SearchAll';
// import SearchEvent from 'views/screens/SearchEvent';
// import SearchTeam from 'views/screens/SearchTeam';
import SearchItem from 'views/screens/SearchItem';

import type {SearchTabScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  all: {
    name: 'All',
    tabName: I18n.t('all'),
    component: SearchAll,
  },
  event: {
    name: 'Events',
    tabName: I18n.t('events'),
    component: SearchItem,
  },
  team: {
    name: 'Teams',
    tabName: I18n.t('teams'),
    component: SearchItem,
  },
  supportersClubs: {
    name: 'SupportetsClubs',
    tabName: I18n.t('supportersClubs'),
    component: SearchItem,
  },
  ultras: {
    name: 'Ultras',
    tabName: I18n.t('ultras'),
    component: SearchItem,
  },
};

export default SCREENS;
