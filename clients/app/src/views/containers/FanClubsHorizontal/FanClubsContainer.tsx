import React from 'react';
import FanClubsComponent, {
  FanClubsLoader,
} from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';

const fanClubsStore = buildFanClubsStore();
fanClubsStore.getAll();

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  showHeaderButton = true,
  withBounce = true,
}) => {
  const result = fanClubsStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <FanClubsLoader />;

  return (
    <FanClubsComponent
      data={result.list.data || []}
      onEndReached={fanClubsStore.getAll}
      withBounce={withBounce}
      showHeaderButton={showHeaderButton}
    />
  );
};

export default FanClubsContainer;
