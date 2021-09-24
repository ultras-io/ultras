import Match from 'screens/Match';
import Event from 'screens/Event';

// import type {SearchNavigationScreens} from './types';

export const TAB_NAME = 'Search';

const SCREENS = {
  match: {
    name: 'Match',
    component: Match,
  },
  event: {
    name: 'Event',
    component: Event,
  },
};

export default SCREENS;
