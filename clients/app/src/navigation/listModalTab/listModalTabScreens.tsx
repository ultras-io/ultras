import I18n from 'i18n/i18n';

import FootballClubs from 'views/screens/SearchListModal/containers/FootballClubs';
import NationalTeams from 'views/screens/SearchListModal/containers/NationalTeams';

import type { ListModalTabScreens } from '../types';

export const TAB_NAME = 'ListModal';

const SCREENS: ListModalTabScreens = {
  footballClubs: {
    name: I18n.t('footballClubs'),
    component: FootballClubs,
  },
  nationalTeams: {
    name: I18n.t('nationalTeams'),
    component: NationalTeams,
  },
};

export default SCREENS;
