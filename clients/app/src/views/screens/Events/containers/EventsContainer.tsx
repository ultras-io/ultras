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
  const { list: listStore } = eventsStore.useSelector('list');

  React.useEffect(() => {
    listStore.updateFilter({
      fanClubId,
      matchId,
      teamId,
    });
    listStore.getAll();
  }, [listStore, fanClubId, matchId, teamId]);

  // @TODO handle error status
  if (!listStore.data && listStore.status === 'loading') {
    return <EventsLoader />;
  }

  return (
    <EventsComponent
      loading={listStore.status === 'loading'}
      data={listStore.data || []}
      onEndReached={listStore.getAll}
    />
  );
};

export default EventsContainer;
