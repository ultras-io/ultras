import React from 'react';
import Container from 'views/components/base/Container';

const MatchesContainer = React.lazy(() => import('./containers/MatchesContainer'));

const Matches: React.FC = () => {
  return (
    <Container withSuspense withBg bgSize={'lg'}>
      <MatchesContainer />
    </Container>
  );
};

export default Matches;
