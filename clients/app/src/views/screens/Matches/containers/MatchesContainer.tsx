import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import buildMatchesStore from 'stores/matches';
import { OrderEnum } from '@ultras/utils';
import { IMatchesContainerProps } from '../types';

const matchesStore = buildMatchesStore();

const MatchesContainer: React.FC<IMatchesContainerProps> = ({ route }) => {
  const teamId = route?.params?.teamId ?? '2124,212'; // my teams get from profile

  React.useEffect(() => {
    matchesStore.updateFilter({
      teamId,
      orderAttr: 'dateTime',
      order: OrderEnum.desc,
    });
    matchesStore.getAll();
  }, [teamId]);

  const result = matchesStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <MatchesLoader />;

  return (
    <MatchesComponent data={result.list.data || []} onEndReached={matchesStore.getAll} />
  );
};

export default MatchesContainer;
