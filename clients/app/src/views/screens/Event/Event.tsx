import React from 'react';
import Container from 'views/components/base/Container';
import { IEventProps } from './types';

const EventContainer = React.lazy(() => import('./containers/EventContainer'));

const Event: React.FC<IEventProps> = ({ route }) => {
  const { id } = route.params;

  return (
    <Container withSuspense>
      <EventContainer id={id} />
    </Container>
  );
};

export default Event;
