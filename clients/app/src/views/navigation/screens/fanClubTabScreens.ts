import I18n from 'i18n/i18n';
import type { FanClubTabScreens } from '../types';

export const TAB_NAME = 'FanClubTabs';

const SCREENS: FanClubTabScreens = {
  rooms: {
    name: 'Rooms',
    tabName: I18n.t('rooms'),
  },
  events: {
    name: 'Events',
    tabName: I18n.t('events'),
  },
};

export default SCREENS;
