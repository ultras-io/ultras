import React from 'react';
import RoomsComponent, { RoomsLoader } from '../components/RoomsComponent';
import buildRoomsStore from 'stores/rooms';
import { IRoomsContainerProps } from '../types';

const RoomsContainer: React.FC<IRoomsContainerProps> = ({ fanClubId }) => {
  const roomsStoreRef = React.useRef(buildRoomsStore());

  const getData = React.useCallback(() => {
    roomsStoreRef.current.updateFilter({
      fanClubId,
    });
    roomsStoreRef.current.getAll();
  }, [fanClubId]);

  React.useEffect(getData, [getData]);

  const result = roomsStoreRef.current.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <RoomsLoader />;

  return (
    <RoomsComponent
      data={result.list.data || []}
      onEndReached={roomsStoreRef.current.getAll}
    />
  );

  return null;
};

export default RoomsContainer;
