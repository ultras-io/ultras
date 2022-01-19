import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import TeamContainer from './containers/TeamContainer';

import TeamTabNavigation from './components/TeamTabNavigation';

import { ITeamProps } from './types';

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { id, tabName } = route.params;
  return (
    <WithSafeArea>
      <TeamContainer id={id} />
      <TeamTabNavigation tabName={tabName} />
    </WithSafeArea>
  );
};

export default Team;
