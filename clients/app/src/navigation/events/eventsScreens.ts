import Events from 'screens/Events';
import Match from 'screens/Match';
import Event from 'screens/Event';

import type {EventsNavigationScreens} from '../types';

export const TAB_NAME = 'Events';

const SCREENS: EventsNavigationScreens = {
  events: {
    name: 'Events',
    component: Events,
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
