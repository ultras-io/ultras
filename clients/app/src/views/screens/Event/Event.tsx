import React from 'react';
import Container from 'views/components/base/Container';
import { IEventProps } from './types';

const EventContainer = React.lazy(() => import('./containers/EventContainer'));

const Event: React.FC<IEventProps> = ({ route }) => {
  const { data } = route.params;

  return (
    <Container withSuspense>
      <EventContainer data={data} />
    </Container>
  );
};

export default Event;
