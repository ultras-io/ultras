import commonScreens from '../commonScreens';

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
    name: commonScreens.match,
    component: Match,
  },
  event: {
    name: commonScreens.event,
    component: Event,
  },
  newEvent: {
    name: 'New Event',
    component: NewEvent,
  },
};

export default SCREENS;
