import React from 'react';
import FanClubComponent from '../components/FanClubComponent';
import buildFanClubsStore from 'stores/fanClubs/fanClubs';
import { IFanClubContainerProps } from '../types';

const FanClubContainer: React.FC<IFanClubContainerProps> = ({ data }) => {
  const fanClubsStore = React.useMemo(() => buildFanClubsStore(), []);
  const { single: storeSingle } = fanClubsStore.useSelector('single');

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <FanClubComponent
      data={
        storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data
      }
    />
  );
};

export default FanClubContainer;
