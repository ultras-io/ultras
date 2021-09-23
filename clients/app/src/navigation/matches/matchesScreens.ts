import Matches from '../../screens/Matches';
import Match from '../../screens/Match';
import Event from '../../screens/Event';

import type {MatchesNavigationScreens} from '../types';

const SCREENS: MatchesNavigationScreens = {
  matches: {
    name: 'Matches:Matches',
    component: Matches,
  },
  match: {
    name: 'Matches:Match',
    component: Match,
  },
  event: {
    name: 'Matches:Event',
    component: Event,
  },
};

export default SCREENS;
