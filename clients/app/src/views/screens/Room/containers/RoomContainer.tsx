import React from 'react';
import RoomComponent from '../components/RoomComponent';
import buildRoomsStore from 'stores/rooms';
import { IRoomContainerProps } from '../types';

const RoomContainer: React.FC<IRoomContainerProps> = ({ data }) => {
  const roomsStore = React.useMemo(() => buildRoomsStore(), []);
  const { single: storeSingle } = roomsStore.useSelector('single');

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <RoomComponent
      data={
        storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data
      }
    />
  );
};

export default RoomContainer;
