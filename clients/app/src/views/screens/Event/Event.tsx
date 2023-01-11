import React from 'react';
import Container from 'views/components/base/Container';
import buildEventsStore from 'stores/events/events';
import { IEventProps } from './types';

const EventContainer = React.lazy(() => import('./containers/EventContainer'));

const Event: React.FC<IEventProps> = ({ route }) => {
  const { data } = route.params;

  const eventsStore = React.useMemo(() => buildEventsStore(), []);
  const { single: storeSingle } = eventsStore.useSelector('single');

  const eventData = React.useMemo(() => {
    return storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data;
  }, [data, storeSingle.data, storeSingle.status]);

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <Container withSuspense>
      <EventContainer data={eventData} />
    </Container>
  );
};

export default Event;
