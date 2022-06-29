import React from 'react';
import TeamComponent from '../components/TeamComponent';
import buildTeamsStore from 'stores/teams';
// import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  const teamsStoreRef = React.useRef(buildTeamsStore());
  // const favoriteTeamsStoreRef = React.useRef(buildFavoriteTeamsStore());

  React.useEffect(() => {
    teamsStoreRef.current.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id]);

  const result = teamsStoreRef.current.useSelector('single');
  // const result = favoriteTeamsStoreRef.current.add;

  return (
    <TeamComponent
      data={
        result.single.data && result.single.status === 'success'
          ? result.single.data
          : data
      }
    />
  );
};

export default TeamContainer;
