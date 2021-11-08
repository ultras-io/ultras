import React from 'react';

import TeamComponent from '../components/TeamComponent';

import {
  generateTeamName,
  generateCountry,
  generateTeamURL,
  // generateFlagURL,
} from 'utils/helpers/dummy';

import {ITeamContainerProps} from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({id}) => {
  // get teams's data by id
  const data = {
    avatarUri: generateTeamURL(),
    name: generateTeamName(),
    country: generateCountry(),
    city: generateCountry(),
    inMyTeams: false,
  };

  return <TeamComponent data={data} />;
};

export default TeamContainer;
