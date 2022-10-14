import React from 'react';
import MatchComponent from '../components/MatchComponent';
// import buildMatchesStore from 'stores/matches';
import { IMatchContainerProps } from '../types';

const MatchContainer: React.FC<IMatchContainerProps> = ({ data }) => {
  // const matchesStore = React.useMemo(() => buildMatchesStore(), []);
  // const { single: storeSingle } = matchesStore.useSelector('single');

  // React.useEffect(() => {
  //   storeSingle.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [storeSingle, data.id]);

  return <MatchComponent data={data} />;
};

export default MatchContainer;
