import React from 'react';
import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import TeamsComponent, { TeamsLoader } from '../components/TeamsComponent';
import { ITeamsContainerProps } from '../types';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ id }) => {
  const favoriteTeamsStoreRef = React.useRef(buildFavoriteTeamsStore());
  React.useEffect(() => {
    // get user teams if id exist
    //else
    favoriteTeamsStoreRef.current.getAll();
  }, []);

  const result = favoriteTeamsStoreRef.current.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <TeamsLoader />;
  return result.list.data && <TeamsComponent data={result.list.data || []} />;
};

export default TeamsContainer;
