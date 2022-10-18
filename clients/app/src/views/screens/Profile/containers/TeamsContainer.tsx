import React from 'react';
import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import TeamsComponent, { TeamsLoader } from '../components/TeamsComponent';
import { ITeamsContainerProps } from '../types';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ isMe, data }) => {
  const favoriteTeamsStore = React.useMemo(() => buildFavoriteTeamsStore(), []);
  const { list: storeList } = favoriteTeamsStore.useSelector('list');

  React.useEffect(() => {
    if (isMe) {
      // need to reset and get All
      storeList.getAll();
    }
  }, [data?.teams, storeList, isMe]);

  if (!isMe) {
    return data?.teams ? <TeamsComponent data={data.teams} /> : <TeamsLoader />;
  }

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <TeamsLoader />;
  }

  return storeList.data && <TeamsComponent data={storeList.data || []} />;
};

export default React.memo<ITeamsContainerProps>(TeamsContainer);
