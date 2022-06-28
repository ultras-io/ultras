import React from 'react';
import TeamComponent from '../components/TeamComponent';
// import buildFavoriteTeamsStore from 'stores/favoriteTeams';
// import initAuthStore, { IState } from 'stores/authentication';
import { ITeamContainerProps } from '../types';

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  // const favoriteTeamsStoreRef = React.useRef(buildFavoriteTeamsStore());

  // React.useEffect(() => {
  //   teamsStoreRef.current.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [data.id]);

  // const result = favoriteTeamsStoreRef.current.add;
  // console.log(result);
  // console.log(isFavorite);

  return <TeamComponent data={data} />;
};

export default TeamContainer;
