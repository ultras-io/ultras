import React from 'react';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { IMatchComponentProps } from '../types';
// import styles from '../styles';

const MatchComponent: React.FC<IMatchComponentProps> = ({ data }) => {
  return <MatchInfo data={data} />;
};

export default MatchComponent;
