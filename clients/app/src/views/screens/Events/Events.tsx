import React from 'react';
import EventsContainer from './containers/EventsContainer';
import { IEventsProps } from './types';

const Events: React.FC<IEventsProps> = () => {
  return (
    // <WithSafeArea>
    <EventsContainer />
    // </WithSafeArea>
  );
};

export default Events;
