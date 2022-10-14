import React from 'react';
import RoomsComponent, { RoomsLoader } from '../components/RoomsComponent';
import buildRoomsStore from 'stores/rooms';
import { IRoomsContainerProps } from '../types';

const RoomsContainer: React.FC<IRoomsContainerProps> = ({ fanClubId }) => {
  const roomsStore = React.useMemo(() => buildRoomsStore(), []);
  const { list: storeList } = roomsStore.useSelector('list');

  const getData = React.useCallback(() => {
    storeList.updateFilter({
      fanClubId,
    });
    storeList.getAll();
  }, [fanClubId, storeList]);

  React.useEffect(getData, [getData]);

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <RoomsLoader />;
  }

  return (
    <RoomsComponent
      loading={storeList.status === 'loading'}
      data={storeList.data || []}
      onEndReached={storeList.getAll}
    />
  );

  return null;
};

export default RoomsContainer;
