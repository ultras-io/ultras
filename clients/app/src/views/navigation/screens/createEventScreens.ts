import type { ICreateEventScreen } from '../types';
import CreateEvent from 'views/screens/CreateEvent/screens/CreateEvent';
import SelectMatch from 'views/screens/CreateEvent/screens/SelectMatch';

const screens: ICreateEventScreen = {
  createEvent: {
    name: 'CreateEvent',
    component: CreateEvent,
  },
  selectMatch: {
    name: 'SelectMatch',
    component: SelectMatch,
  },
};

export default screens;
