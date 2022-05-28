import React from 'react';
import SearchItemComponent from '../components/SearchItemComponent';
import buildFanClubsStore from 'stores/fanClubs';
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

  const result = store.useSelector('list');

  const updateData = React.useCallback(() => {
    store.updateFilter({ name: searchText });
    store.getAll();
  }, [store, searchText]);

  React.useEffect(updateData, [updateData, searchText]);

  return (
    <SearchItemComponent
      data={result.list.data || []}
      searchItem={searchItem}
      onEndReached={store.getAll}
    />
  );
};

export default SearchItemContainer;
