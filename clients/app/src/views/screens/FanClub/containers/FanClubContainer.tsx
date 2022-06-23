import React from 'react';
import FanClubComponent from '../components/FanClubComponent';
// import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubContainerProps } from '../types';

const FanClubContainer: React.FC<IFanClubContainerProps> = ({ data }) => {
  // const fanClubsStoreRef = React.useRef(buildFanClubsStore());

  // React.useEffect(() => {
  //   fanClubsStoreRef.current.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [data.id]);

  // const result = fanClubsStoreRef.current.useSelector('single');

  return <FanClubComponent data={data} />;
};

export default FanClubContainer;
