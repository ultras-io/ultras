import React from 'react';
import Container from 'views/components/base/Container';
import buildRoomsStore from 'stores/rooms';
import { IRoomProps } from './types';

const RoomContainer = React.lazy(() => import('./containers/RoomContainer'));

const Room: React.FC<IRoomProps> = ({ route }) => {
  const { data } = route.params;

  const roomsStore = React.useMemo(() => buildRoomsStore(), []);
  const { single: storeSingle } = roomsStore.useSelector('single');

  const roomData = React.useMemo(() => {
    return storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data;
  }, [data, storeSingle.data, storeSingle.status]);

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <Container withSuspense>
      <RoomContainer data={roomData} />
    </Container>
  );
};

export default Room;
