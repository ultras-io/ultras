import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import authenticationStore, { IState } from 'stores/authentication';
import buildMatchesStore from 'stores/matches';
import { OrderEnum } from '@ultras/utils';
import { IMatchesContainerProps } from '../types';

const useAuthenticationStore = authenticationStore.initStore();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const matchesStore = React.useMemo(() => buildMatchesStore(), []);
  const { list: storeList } = matchesStore.useSelector('list');

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());

  const getData = React.useCallback(() => {
    storeList.updateFilter({
      teamId: user.teams,
      limit: 3,
      orderAttr: 'dateTime',
      order: OrderEnum.desc,
    });
    storeList.getAll();
  }, [storeList, user.teams]);

  React.useEffect(getData, [getData]);

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <MatchesLoader />;
  }

  return storeList.data && storeList.data.length ? (
    <MatchesComponent data={storeList.data || []} />
  ) : null;
};

export default MatchesContainer;
