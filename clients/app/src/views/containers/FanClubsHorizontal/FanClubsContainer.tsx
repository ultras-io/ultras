import React from 'react';
import FanClubsComponent, {
  FanClubsLoader,
} from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({ type = 'discover' }) => {
  const fanClubsStoreRef = React.useRef(buildFanClubsStore());

  React.useEffect(() => {
    // if type === 'my' filter my fun clubs
    // else filter fan clubs of my supported teams

    fanClubsStoreRef.current.getAll();
  }, []);

  const result = fanClubsStoreRef.current.useSelector('list');
  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading')
    return <FanClubsLoader type={type} />;

  return (
    result.list.data && (
      <FanClubsComponent
        data={result.list.data}
        onEndReached={fanClubsStoreRef.current.getAll}
        type={type}
      />
    )
  );
};

export default FanClubsContainer;
