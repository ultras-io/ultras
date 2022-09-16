import React from 'react';
import TeamComponent from '../components/TeamComponent';
import buildTeamsStore from 'stores/teams';
// import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  const teamsStore = React.useMemo(() => buildTeamsStore(), []);
  // const favoriteTeamsStore = React.useMemo(() => buildFavoriteTeamsStore(), []);

  React.useEffect(() => {
    teamsStore.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, teamsStore]);

  const result = teamsStore.useSelector('single');
  // const result = favoriteTeamsStore.add;

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
