import React from 'react';
import EventComponent from '../components/EventComponent';
import buildEventsStore from 'stores/events';
import { IEventContainerProps } from '../types';

const eventsStore = buildEventsStore();

const EventContainer: React.FC<IEventContainerProps> = ({ data }) => {
  React.useEffect(() => {
    eventsStore.getSingle(data.id);
    // erase store on unmount
  }, [data.id]);

  const result = eventsStore.useSelector('single');

  return (
    <EventComponent
      data={
        result.single.data && result.single.status === 'success'
          ? result.single.data
          : data
      }
    />
  );
};

export default EventContainer;
