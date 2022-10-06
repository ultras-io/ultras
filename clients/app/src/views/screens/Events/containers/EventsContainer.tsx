import React from 'react';
import EventsComponent, { EventsLoader } from '../components/EventsComponent';
import buildEventsStore from 'stores/events/events';
import { IEventsContainerProps } from '../types';

const EventsContainer: React.FC<IEventsContainerProps> = ({
  fanClubId,
  matchId,
  teamId,
}) => {
  const eventsStore = React.useMemo(() => buildEventsStore(), []);

  React.useEffect(() => {
    eventsStore.updateFilter({
      fanClubId,
      matchId,
      teamId,
    });
    eventsStore.getAll();
  }, [eventsStore, fanClubId, matchId, teamId]);

  const result = eventsStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <EventsLoader />;

  return (
    <EventsComponent
      loading={result.list.status === 'loading'}
      data={result.list.data || []}
      onEndReached={eventsStore.getAll}
    />
  );
};

export default EventsContainer;
