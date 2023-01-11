import React from 'react';
import FanClubComponent from '../components/FanClubComponent';
import { IFanClubContainerProps } from '../types';

const FanClubContainer: React.FC<IFanClubContainerProps> = ({ data }) => {
  return <FanClubComponent data={data} />;
};

export default FanClubContainer;
