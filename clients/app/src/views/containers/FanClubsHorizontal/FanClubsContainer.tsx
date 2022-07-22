import React from 'react';
import FanClubsComponent, {
  FanClubsLoader,
} from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  data,
  type = 'discover',
}) => {
  const fanClubsStoreRef = React.useRef(buildFanClubsStore());

  React.useEffect(() => {
    // filter my fun clubs
    if (type === 'my') fanClubsStoreRef.current.getAll();
    // filter fan clubs of my supported teams
    else if (type === 'discover') fanClubsStoreRef.current.getAll();
  }, [type]);

  const result = fanClubsStoreRef.current.useSelector('list');

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
      onEndReached={fanClubsStoreRef.current.getAll}
      type={type}
    />
  ) : null;
};

export default FanClubsContainer;
