import React from 'react';
import EventComponent from '../components/EventComponent';
import buildEventsStore from 'stores/events/events';
import { IEventContainerProps } from '../types';

const EventContainer: React.FC<IEventContainerProps> = ({ data }) => {
  const eventsStore = React.useMemo(() => buildEventsStore(), []);

  React.useEffect(() => {
    eventsStore.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, eventsStore]);

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
