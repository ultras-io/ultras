import React from 'react';

import TeamInfo from 'views/components/compositions/TeamInfo';

import {ITeamComponentProps} from '../types';

const TeamComponent: React.FC<ITeamComponentProps> = ({data}) => {
  return (
    <TeamInfo
      avatarUri={data.avatarUri}
      name={data.name}
      country={data.country}
      city={data.city}
      inMyTeams={data.inMyTeams}
    />
  );
};

export default TeamComponent;
