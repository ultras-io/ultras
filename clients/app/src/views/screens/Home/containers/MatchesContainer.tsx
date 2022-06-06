import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import buildMatchesStore from 'stores/matches';
import { IMatchesContainerProps } from '../types';

const matchesStore = buildMatchesStore();
matchesStore.getAll();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const result = matchesStore.useSelector('list');

  // @TODO handle error status
  if (result.list.status === 'loading') return <MatchesLoader />;

  return <MatchesComponent data={result.list.data || []} onEndReached={() => {}} />;
};

export default MatchesContainer;
