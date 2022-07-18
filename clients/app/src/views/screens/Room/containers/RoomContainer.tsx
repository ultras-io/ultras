import React from 'react';
import RoomComponent from '../components/RoomComponent';
import buildRoomsStore from 'stores/rooms';
import { IRoomContainerProps } from '../types';

const RoomContainer: React.FC<IRoomContainerProps> = ({ data }) => {
  const roomsStoreRef = React.useRef(buildRoomsStore());

  React.useEffect(() => {
    roomsStoreRef.current.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id]);

  const result = roomsStoreRef.current.useSelector('single');

  return (
    <RoomComponent
      data={
        result.single.data && result.single.status === 'success'
          ? result.single.data
          : data
      }
    />
  );
};

export default RoomContainer;
