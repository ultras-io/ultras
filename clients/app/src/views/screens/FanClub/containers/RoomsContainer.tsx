import React from 'react';
import RoomsComponent, { RoomsLoader } from '../components/RoomsComponent';
import buildRoomsStore from 'stores/rooms';
import { IRoomsContainerProps } from '../types';

const RoomsContainer: React.FC<IRoomsContainerProps> = ({ fanClubId }) => {
  const roomsStore = React.useMemo(() => buildRoomsStore(), []);

  const getData = React.useCallback(() => {
    roomsStore.updateFilter({
      fanClubId,
    });
    roomsStore.getAll();
  }, [fanClubId, roomsStore]);

  React.useEffect(getData, [getData]);

  const result = roomsStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <RoomsLoader />;

  return (
    <RoomsComponent
      loading={result.list.status === 'loading'}
      data={result.list.data || []}
      onEndReached={roomsStore.getAll}
    />
  );

  return null;
};

export default RoomsContainer;
