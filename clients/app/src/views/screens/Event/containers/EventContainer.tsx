import React from 'react';
import EventComponent from '../components/EventComponent';
import buildEventsStore from 'stores/events/events';
import { IEventContainerProps } from '../types';

const EventContainer: React.FC<IEventContainerProps> = ({ data }) => {
  const eventsStore = React.useMemo(() => buildEventsStore(), []);
  const { single: storeSingle } = eventsStore.useSelector('single');

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <EventComponent
      data={
        storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data
      }
    />
  );
};

export default EventContainer;
