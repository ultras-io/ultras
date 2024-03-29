import React from 'react';
import MatchComponent from '../components/MatchComponent';
import { IMatchContainerProps } from '../types';

const MatchContainer: React.FC<IMatchContainerProps> = ({ data }) => {
  return <MatchComponent data={data} />;
};

export default MatchContainer;
