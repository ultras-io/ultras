import I18n from 'i18n/i18n';

import SearchItem from 'views/components/compositions/SearchItem';

import type { SearchTabScreens } from '../types';

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  // all: {
  //   name: 'All',
  //   tabName: I18n.t('all'),
  //   component: SearchItem,
  // },
  team: {
    name: 'Teams',
    tabName: I18n.t('teams'),
    component: SearchItem,
  },
  fanClubs: {
    name: 'FanClubs',
    tabName: I18n.t('fanClubs'),
    component: SearchItem,
  },
  // ultras: {
  //   name: 'Ultras',
  //   tabName: I18n.t('ultras'),
  //   component: SearchItem,
  // },
};

export default SCREENS;
