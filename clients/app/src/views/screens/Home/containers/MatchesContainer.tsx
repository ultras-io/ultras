import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import initAuthStore, { IState } from 'stores/authentication';
import buildMatchesStore from 'stores/matches';
import { OrderEnum } from '@ultras/utils';
import { IMatchesContainerProps } from '../types';

const useAuthenticationStore = initAuthStore();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const matchesStoreRef = React.useRef(buildMatchesStore());
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());

  const getData = React.useCallback(() => {
    matchesStoreRef.current.updateFilter({
      teamId: user.teams,
      limit: 3,
      orderAttr: 'dateTime',
      order: OrderEnum.desc,
    });
    matchesStoreRef.current.getAll();
  }, [user.teams]);

  React.useEffect(getData, [getData]);
  const result = matchesStoreRef.current.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <MatchesLoader />;

  return result.list.data && <MatchesComponent data={result.list.data || []} />;
};

export default MatchesContainer;
