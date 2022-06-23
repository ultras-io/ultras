import React from 'react';
import FanClubsComponent, {
  FanClubsLoader,
} from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  showHeaderButton = true,
  withBounce = true,
}) => {
  const fanClubsStoreRef = React.useRef(buildFanClubsStore());

  React.useEffect(() => {
    fanClubsStoreRef.current.getAll();
  }, []);

  const result = fanClubsStoreRef.current.useSelector('list');
  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <FanClubsLoader />;

  return (
    result.list.data && (
      <FanClubsComponent
        data={result.list.data}
        onEndReached={fanClubsStoreRef.current.getAll}
        withBounce={withBounce}
        showHeaderButton={showHeaderButton}
      />
    )
  );
};

export default FanClubsContainer;
