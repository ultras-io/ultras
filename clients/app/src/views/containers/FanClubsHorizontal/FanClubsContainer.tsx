import React from 'react';
import FanClubsComponent, {
  FanClubsLoader,
} from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import buildFanClubsStore from 'stores/fanClubs/fanClubs';
import { IFanClubsContainerProps } from './types';

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  data,
  type = 'discover',
}) => {
  const fanClubsStore = React.useMemo(() => buildFanClubsStore(), []);
  const { list: storeList } = fanClubsStore.useSelector('list');

  React.useEffect(() => {
    // filter my fun clubs
    if (type === 'my') storeList.getAll();
    // filter fan clubs of my supported teams
    else if (type === 'discover') storeList.getAll();
  }, [storeList, type]);

  if (type === 'otherUser')
    return data ? (
      <FanClubsComponent data={data} type={type} onEndReached={() => {}} />
    ) : (
      <FanClubsLoader type={type} />
    );

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <FanClubsLoader type={type} />;
  }

  return storeList.data && storeList.data.length ? (
    <FanClubsComponent
      data={storeList.data}
      onEndReached={storeList.getAll}
      type={type}
      loading={storeList.status === 'loading'}
    />
  ) : null;
};

export default FanClubsContainer;
