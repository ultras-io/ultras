import React from 'react';
import Container from 'views/components/base/Container';
import { IMatchesProps } from './types';

const MatchesContainer = React.lazy(() => import('./containers/MatchesContainer'));

const Matches: React.FC<IMatchesProps> = () => {
  return (
    <Container withSuspense withBg bgSize={'lg'}>
      <MatchesContainer />
    </Container>
  );
};

export default Matches;
