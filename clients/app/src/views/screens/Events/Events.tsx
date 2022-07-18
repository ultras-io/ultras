import React from 'react';
import authenticationStore, { IState } from 'stores/authentication';
import Container from 'views/components/base/Container';

const EventsContainer = React.lazy(() => import('./containers/EventsContainer'));
const useAuthenticationStore = authenticationStore.initStore();

const Events: React.FC = () => {
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());

  return (
    <Container withSuspense withBg bgSize={'lg'}>
      <EventsContainer teamId={user.teams} />
    </Container>
  );
};

export default Events;
