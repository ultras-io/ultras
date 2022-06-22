import React from 'react';
import Container from 'views/components/base/Container';

const EventsContainer = React.lazy(() => import('./containers/EventsContainer'));

const Events: React.FC = () => {
  return (
    <Container withSuspense withBg bgSize={'lg'}>
      <EventsContainer />
    </Container>
  );
};

export default Events;
