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

  const [searchText, setSearchText] = React.useState<string>('');
  const { list } = matchesStore.useSelector('list');

  React.useLayoutEffect(() => {
    matchesStore.updateFilter({ search: searchText });
    matchesStore.getAll();
  }, [matchesStore, searchText]);

  const onSelect = React.useCallback(
    (selectedMatchId: ResourceIdentifier) => {
      eventsStore.setAddFieldValue('matchId', selectedMatchId);
      goBack();
    },
    [goBack]
  );

  return (
    <>
      <SearchMatchComponent onChange={setSearchText} />

      <SelectMatchComponent
        data={list.data || []}
        loading={list.status === 'loading'}
        matchId={matchId}
        onSelect={onSelect}
        onEndReached={list.status === 'loading' ? undefined : matchesStore.getAll}
      />
    </>
  );
};

export default SelectMatchContainer;
