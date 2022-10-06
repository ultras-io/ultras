import React from 'react';
import SearchItemComponent, { SearchItemLoader } from '../components/SearchItemComponent';
import buildFanClubsStore from 'stores/fanClubs/fanClubs';
import buildTeamsStore from 'stores/teams';
import { ISearchItemProps } from '../types';

const SearchItemContainer: React.FC<ISearchItemProps> = ({ searchItem, searchText }) => {
  const store = React.useMemo(() => {
    switch (searchItem) {
      case 'teams':
        return buildTeamsStore();
      case 'fanClubs':
        return buildFanClubsStore();
    }
  }, [searchItem]);

  const updateData = React.useCallback(() => {
    store.updateFilter({ name: searchText });
    store.getAll();
  }, [store, searchText]);

  React.useEffect(updateData, [updateData, searchText]);

  const result = store.useSelector('list');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <SearchItemLoader />;

  return (
    <SearchItemComponent
      loading={result.list.status === 'loading'}
      data={result.list.data || []}
      searchItem={searchItem}
      onEndReached={store.getAll}
    />
  );
};

export default SearchItemContainer;
