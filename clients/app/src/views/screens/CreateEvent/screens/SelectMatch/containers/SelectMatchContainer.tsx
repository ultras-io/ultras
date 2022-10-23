import React from 'react';
import buildMatchesStore from 'stores/matches';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SearchMatchComponent from '../components/SearchMatchComponent';
import SelectMatchComponent from '../components/SelectMatchComponent';
import { eventsStore } from '../../../store';
import { ISelectMatchContainerProps } from '../types';

const SelectMatchContainer: React.FC<ISelectMatchContainerProps> = ({ matchId }) => {
  const { goBack } = useNavigationWithParams();
  const matchesStore = React.useMemo(() => buildMatchesStore(), []);

  const { add: storeAdd } = eventsStore.useSelector('add');

  const [searchText, setSearchText] = React.useState<string>('');
  const { list: storeList } = matchesStore.useSelector('list');

  React.useLayoutEffect(() => {
    storeList.updateFilter({ search: searchText });
    storeList.getAll();
  }, [matchesStore, searchText, storeList]);

  const onSelect = React.useCallback(
    (selectedMatchId: ResourceIdentifier) => {
      storeAdd.setFieldValue('matchId', selectedMatchId);
      goBack();
    },
    [goBack, storeAdd]
  );

  return (
    <>
      <SearchMatchComponent onChange={setSearchText} />

      <SelectMatchComponent
        data={storeList.data || []}
        loading={storeList.status === 'loading'}
        matchId={matchId}
        onSelect={onSelect}
        onEndReached={storeList.status === 'loading' ? undefined : storeList.getAll}
      />
    </>
  );
};

export default SelectMatchContainer;
