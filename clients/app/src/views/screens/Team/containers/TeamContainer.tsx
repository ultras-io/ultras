import React from 'react';
import TeamComponent from '../components/TeamComponent';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  return <TeamComponent data={data} />;
};

export default TeamContainer;
