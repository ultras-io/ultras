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

  React.useEffect(() => {
    // filter my fun clubs
    if (type === 'my') fanClubsStore.getAll();
    // filter fan clubs of my supported teams
    else if (type === 'discover') fanClubsStore.getAll();
  }, [fanClubsStore, type]);

  const result = fanClubsStore.useSelector('list');

  if (type === 'otherUser')
    return data ? (
      <FanClubsComponent data={data} type={type} onEndReached={() => {}} />
    ) : (
      <FanClubsLoader type={type} />
    );

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading')
    return <FanClubsLoader type={type} />;

  return result.list.data && result.list.data.length ? (
    <FanClubsComponent
      data={result.list.data}
      onEndReached={fanClubsStore.getAll}
      type={type}
    />
  ) : null;
};

export default FanClubsContainer;
