import React from 'react';
import TeamComponent from '../components/TeamComponent';
import buildTeamsStore from 'stores/teams';
// import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  const teamsStore = React.useMemo(() => buildTeamsStore(), []);
  const { single: storeSingle } = teamsStore.useSelector('single');

  // const favoriteTeamsStore = React.useMemo(() => buildFavoriteTeamsStore(), []);
  // const result = favoriteTeamsStore.add;

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <TeamComponent
      data={
        storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data
      }
    />
  );
};

export default TeamContainer;
