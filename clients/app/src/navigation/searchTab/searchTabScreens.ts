import I18n from 'i18n/i18n';

import SearchItem from 'views/screens/SearchItem';

import type {SearchTabScreens} from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  all: {
    name: 'All',
    tabName: I18n.t('all'),
    component: SearchItem,
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
    name: 'SupportersClubs',
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
