import Events from '../../screens/Events';
import Match from '../../screens/Match';
import Event from '../../screens/Event';

import type {EventsNavigationScreens} from '../types';

const SCREENS: EventsNavigationScreens = {
  events: {
    name: 'Events:Events',
    component: Events,
  },
  match: {
    name: 'Events:Match',
    component: Match,
  },
  event: {
    name: 'Events:Event',
    component: Event,
  },
};

export default SCREENS;
