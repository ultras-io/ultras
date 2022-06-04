import React from 'react';
import TeamContainer from './containers/TeamContainer';
import TeamTabNavigation from './components/TeamTabNavigation';
import { ITeamProps } from './types';

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { data, tabName } = route.params;

  return (
    <>
      <TeamContainer data={data} />
      <TeamTabNavigation tabName={tabName} id={data.id} />
    </>
  );
};

export default Team;
