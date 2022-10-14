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

  const { list: storeList } = store!.useSelector('list');

  const updateData = React.useCallback(() => {
    storeList.updateFilter({ name: searchText });
    storeList.getAll();
  }, [storeList, searchText]);

  React.useEffect(updateData, [updateData, searchText]);

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <SearchItemLoader />;
  }

  return (
    <SearchItemComponent
      loading={storeList.status === 'loading'}
      data={storeList.data || []}
      searchItem={searchItem}
      onEndReached={storeList.getAll}
    />
  );
};

export default SearchItemContainer;
