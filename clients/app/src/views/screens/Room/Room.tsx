import React from 'react';
import Container from 'views/components/base/Container';
import { IRoomProps } from './types';

const RoomContainer = React.lazy(() => import('./containers/RoomContainer'));

const Room: React.FC<IRoomProps> = ({ route }) => {
  const { data } = route.params;

  return (
    <Container withSuspense>
      <RoomContainer data={data} />
    </Container>
  );
};

export default Room;
