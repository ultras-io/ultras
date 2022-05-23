import React from 'react';
import TeamInfo from 'views/components/compositions/TeamInfo';
import { ITeamComponentProps } from '../types';

const TeamComponent: React.FC<ITeamComponentProps> = ({ data }) => {
  return <TeamInfo data={data} />;
};

export default TeamComponent;
