import React from 'react';
import TeamComponent from '../components/TeamComponent';
// import buildTeamsStore from 'stores/teams';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  // const teamsStoreRef = React.useRef(buildTeamsStore());

  // React.useEffect(() => {
  //   teamsStoreRef.current.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [data.id]);

  // const result = teamsStoreRef.current.useSelector('single');

  return <TeamComponent data={data} />;
};

export default TeamContainer;
