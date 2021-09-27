import Events from 'screens/Events';
import Match from 'screens/Match';
import Event from 'screens/Event';
import NewEvent from 'screens/NewEvent';

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
  newEvent: {
    name: 'New Event',
    component: NewEvent,
  },
};

export default SCREENS;
