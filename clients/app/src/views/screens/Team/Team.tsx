import React from 'react';
import TeamContainer from './containers/TeamContainer';
import TeamTabNavigation from './components/TeamTabNavigation';
import { WithBg } from 'views/components/base/Bg';
import { ITeamProps } from './types';

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { data, tabName } = route.params;

  return (
    <WithBg>
      <TeamContainer data={data} />
      <TeamTabNavigation tabName={tabName} id={data.id} />
    </WithBg>
  );
};

export default Team;
