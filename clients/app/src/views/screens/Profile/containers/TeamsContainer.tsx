import React from 'react';
import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import TeamsComponent, { TeamsLoader } from '../components/TeamsComponent';
import { ITeamsContainerProps } from '../types';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ isMe, data }) => {
  const favoriteTeamsStore = React.useMemo(() => buildFavoriteTeamsStore(), []);

  React.useEffect(() => {
    if (isMe) {
      // need to reset and get All
      favoriteTeamsStore.getAll();
    }
  }, [data?.teams, favoriteTeamsStore, isMe]);

  const result = favoriteTeamsStore.useSelector('list');

  if (!isMe) return data?.teams ? <TeamsComponent data={data.teams} /> : <TeamsLoader />;

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <TeamsLoader />;
  return result.list.data && <TeamsComponent data={result.list.data || []} />;
};

export default React.memo<ITeamsContainerProps>(TeamsContainer);
