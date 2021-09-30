import Events from 'views/screens/Events';
import Match from 'views/screens/Match';
import Event from 'views/screens/Event';
import NewEvent from 'views/screens/NewEvent';

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
