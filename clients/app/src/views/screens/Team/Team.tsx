import React from 'react';
import TeamTabNavigation from './components/TeamTabNavigation';
import Container from 'views/components/base/Container';
import { ITeamProps } from './types';

const TeamContainer = React.lazy(() => import('./containers/TeamContainer'));

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { data, tabName } = route.params;

  return (
    <Container withSuspense withBg>
      <TeamContainer data={data} />
      <TeamTabNavigation tabName={tabName} id={data.id} />
    </Container>
  );
};

export default Team;
