import React from 'react';
import MatchesComponent, { MatchesLoader } from '../components/MatchesComponent';
import authenticationStore, { IState } from 'stores/authentication';
import buildMatchesStore from 'stores/matches';
import { OrderEnum } from '@ultras/utils';
import { IMatchesContainerProps } from '../types';

const useAuthenticationStore = authenticationStore.initStore();

const MatchesContainer: React.FC<IMatchesContainerProps> = ({ route }) => {
  const matchesStore = React.useMemo(() => buildMatchesStore(), []);
  const { list: storeList } = matchesStore.useSelector('list');

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());

  const getData = React.useCallback(() => {
    storeList.updateFilter({
      teamId: route?.params?.teamId ?? user.teams,
      orderAttr: 'dateTime',
      order: OrderEnum.desc,
    });
    storeList.getAll();
  }, [storeList, route?.params?.teamId, user.teams]);

  React.useEffect(getData, [getData]);

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') return <MatchesLoader />;

  return (
    <MatchesComponent
      loading={storeList.status === 'loading'}
      data={storeList.data || []}
      onEndReached={storeList.getAll}
    />
  );
};

export default MatchesContainer;
