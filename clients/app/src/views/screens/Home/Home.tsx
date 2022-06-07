import React from 'react';
import Container from 'views/components/base/Container';

const FanClubsContainer = React.lazy(
  () => import('views/containers/FanClubsHorizontal/FanClubsContainer')
);
const MatchesContainer = React.lazy(
  () => import('views/screens/Home/containers/MatchesContainer')
);

const Home: React.FC = () => {
  return (
    <Container withSuspense>
      <FanClubsContainer />
      <MatchesContainer />
    </Container>
  );
};

export default Home;
