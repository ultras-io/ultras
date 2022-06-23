import React from 'react';
import MatchComponent from '../components/MatchComponent';
// import buildMatchesStore from 'stores/matches';
import { IMatchContainerProps } from '../types';

const MatchContainer: React.FC<IMatchContainerProps> = ({ data }) => {
  // const matchesStoreRef = React.useRef(buildMatchesStore());

  // React.useEffect(() => {
  //   matchesStoreRef.current.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [data.id]);

  // const result = matchesStoreRef.current.useSelector('single');

  return <MatchComponent data={data} />;
};

export default MatchContainer;
