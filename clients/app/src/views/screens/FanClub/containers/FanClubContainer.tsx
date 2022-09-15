import React from 'react';
import FanClubComponent from '../components/FanClubComponent';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubContainerProps } from '../types';

const FanClubContainer: React.FC<IFanClubContainerProps> = ({ data }) => {
  const fanClubsStore = React.useMemo(() => buildFanClubsStore(), []);

  React.useEffect(() => {
    fanClubsStore.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, fanClubsStore]);

  const result = fanClubsStore.useSelector('single');

  return (
    <FanClubComponent
      data={
        result.single.data && result.single.status === 'success'
          ? result.single.data
          : data
      }
    />
  );
};

export default FanClubContainer;
