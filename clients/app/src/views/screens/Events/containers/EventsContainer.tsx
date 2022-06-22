import React from 'react';
import EventsComponent, { EventsLoader } from '../components/EventsComponent';
import buildEventsStore from 'stores/events';
import { IEventsContainerProps } from '../types';

const eventsStore = buildEventsStore();
eventsStore.getAll();

const EventsContainer: React.FC<IEventsContainerProps> = () => {
  const result = eventsStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <EventsLoader />;

  return (
    <EventsComponent data={result.list.data || []} onEndReached={eventsStore.getAll} />
  );
};

export default EventsContainer;
