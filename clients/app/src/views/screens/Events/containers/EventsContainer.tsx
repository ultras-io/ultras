import React from 'react';
import EventsComponent, { EventsLoader } from '../components/EventsComponent';
import buildEventsStore from 'stores/events';
import { IEventsContainerProps } from '../types';

const EventsContainer: React.FC<IEventsContainerProps> = () => {
  const eventsStoreRef = React.useRef(buildEventsStore());

  React.useEffect(() => {
    eventsStoreRef.current.getAll();
  }, []);

  const result = eventsStoreRef.current.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <EventsLoader />;

  return (
    <EventsComponent
      data={result.list.data || []}
      onEndReached={eventsStoreRef.current.getAll}
    />
  );
};

export default EventsContainer;
