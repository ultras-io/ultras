import React from 'react';
import MatchComponent from '../components/MatchComponent';
// import buildMatchesStore from 'stores/matches';
import { IMatchContainerProps } from '../types';

const MatchContainer: React.FC<IMatchContainerProps> = ({ data }) => {
  // const matchesStore = React.useMemo(() => buildMatchesStore(), []);

  // React.useEffect(() => {
  //   matchesStore.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [matchesStore, data.id]);

  // const result = matchesStore.useSelector('single');

  return <MatchComponent data={data} />;
};

export default MatchContainer;
