import Matches from 'views/screens/Matches';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';

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
