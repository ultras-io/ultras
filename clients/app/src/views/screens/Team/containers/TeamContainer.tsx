import React from 'react';
import TeamComponent from '../components/TeamComponent';
// import buildTeamsStore from 'stores/teams';
import { ITeamContainerProps } from '../types';

// const teamsStore = buildTeamsStore();

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  // React.useEffect(() => {
  //   teamsStore.getSingle(data.id);
  // }, [data.id]);

  // const result = teamsStore.useSelector('single');

  return <TeamComponent data={data} />;
};

export default TeamContainer;
