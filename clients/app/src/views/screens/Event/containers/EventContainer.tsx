import React from 'react';
import EventComponent from '../components/EventComponent';
import buildEventsStore from 'stores/events/events';
import { IEventContainerProps } from '../types';

const EventContainer: React.FC<IEventContainerProps> = ({ data }) => {
  const eventsStoreRef = React.useRef(buildEventsStore());

  React.useEffect(() => {
    eventsStoreRef.current.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id]);

  const result = eventsStoreRef.current.useSelector('single');

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
