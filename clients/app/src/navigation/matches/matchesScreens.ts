import Matches from 'screens/Matches';
import Match from 'screens/Match';
import Event from 'screens/Event';

import type {MatchesNavigationScreens} from '../types';

export const TAB_NAME = 'Matches';

const SCREENS: MatchesNavigationScreens = {
  matches: {
    name: 'Matches',
    component: Matches,
  },
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
