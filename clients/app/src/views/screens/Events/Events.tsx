import React from 'react';
import Container from 'views/components/base/Container';
// import EventsContainer from './containers/EventsContainer';
const EventsContainer = React.lazy(() => import('./containers/EventsContainer'));

const Events: React.FC = () => {
  return (
    <Container withSuspense>
      <EventsContainer />
    </Container>
  );
};

export default Events;
