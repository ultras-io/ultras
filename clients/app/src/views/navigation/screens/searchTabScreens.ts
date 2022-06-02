// import React from 'react';
import I18n from 'i18n/i18n';
import SearchItem from 'views/components/compositions/SearchItem';
import type { SearchTabScreens } from '../types';

// const SearchItem = React.lazy(() => import('views/components/compositions/SearchItem'));

export const TAB_NAME = 'Search';

const SCREENS: SearchTabScreens = {
  teams: {
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
