import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import authenticationStore, { IState } from 'stores/authentication';
import buildMatchesStore from 'stores/matches';
import { OrderEnum } from '@ultras/utils';
import { IMatchesContainerProps } from '../types';

const useAuthenticationStore = authenticationStore.initStore();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const matchesStore = React.useMemo(() => buildMatchesStore(), []);
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());

  const getData = React.useCallback(() => {
    matchesStore.updateFilter({
      teamId: user.teams,
      limit: 3,
      orderAttr: 'dateTime',
      order: OrderEnum.desc,
    });
    matchesStore.getAll();
  }, [matchesStore, user.teams]);

  React.useEffect(getData, [getData]);
  const result = matchesStore.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <MatchesLoader />;

  return result.list.data && result.list.data.length ? (
    <MatchesComponent data={result.list.data || []} />
  ) : null;
};

export default MatchesContainer;
