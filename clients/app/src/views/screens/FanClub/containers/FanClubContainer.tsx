import React from 'react';
import FanClubComponent from '../components/FanClubComponent';
// import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubContainerProps } from '../types';

// const fanClubsStore = buildFanClubsStore();

const FanClubContainer: React.FC<IFanClubContainerProps> = ({ data }) => {
  // React.useEffect(() => {
  //   fanClubsStore.getSingle(data.id);
  // }, [data.id]);

  // const result = fanClubsStore.useSelector('single');

  return <FanClubComponent data={data} />;
};

export default FanClubContainer;
