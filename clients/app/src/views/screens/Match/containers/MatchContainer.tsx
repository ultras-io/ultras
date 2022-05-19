import React from 'react';
import MatchComponent from '../components/MatchComponent';
// import buildMatchesStore from 'stores/matches';
import { IMatchContainerProps } from '../types';

// const matchesStore = buildMatchesStore();

const MatchContainer: React.FC<IMatchContainerProps> = ({ data }) => {
  // React.useEffect(() => {
  //   matchesStore.getSingle(data.id);
  // }, [data.id]);

  // const result = matchesStore.useSelector('single');

  return <MatchComponent data={data} />;
};

export default MatchContainer;
