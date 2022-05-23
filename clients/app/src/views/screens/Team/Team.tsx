import React from 'react';
import WithSafeArea from 'views/components/base/WithSafeArea';
import TeamContainer from './containers/TeamContainer';
import TeamTabNavigation from './components/TeamTabNavigation';
import { ITeamProps } from './types';

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { data, tabName } = route.params;

  return (
    <WithSafeArea>
      <TeamContainer data={data} />
      <TeamTabNavigation tabName={tabName} id={data.id} />
    </WithSafeArea>
  );
};

export default Team;
