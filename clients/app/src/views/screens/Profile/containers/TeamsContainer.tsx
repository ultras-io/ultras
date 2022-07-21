import React from 'react';
import { IState } from 'stores/authentication';
import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import TeamsComponent, { TeamsLoader } from '../components/TeamsComponent';
import { ITeamsContainerProps } from '../types';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ useStore, id }) => {
  const favoriteTeamsStoreRef = React.useRef(buildFavoriteTeamsStore());
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useStore(userSelector());

  React.useEffect(() => {
    // need to reset and get All
    favoriteTeamsStoreRef.current.getAll();
  }, [user.teams]);

  const result = favoriteTeamsStoreRef.current.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <TeamsLoader />;
  return result.list.data && <TeamsComponent data={result.list.data || []} />;
};

export default TeamsContainer;
