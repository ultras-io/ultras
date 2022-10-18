import React from 'react';
import SearchListComponent, { SearchListLoader } from '../components/SearchListComponent';
import { ISearchListContainerProps } from '../types';
import buildCountriesStore from 'stores/countries';
import buildTeamsStore from 'stores/teams';

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
  onSelect,
}) => {
  const store = React.useMemo(() => {
    switch (dataType) {
      case 'country':
        return buildCountriesStore();
      case 'team':
        return buildTeamsStore();
    }
  }, [dataType]);

  const { list: storeList } = store.useSelector('list');

  const updateData = React.useCallback(() => {
    storeList.updateFilter({ name: searchText, limit: 40 });
    storeList.getAll();
  }, [storeList, searchText]);

  React.useLayoutEffect(updateData, [updateData, searchText]);

  // @TODO handle error status
  if (!storeList.data && storeList.status === 'loading') {
    return <SearchListLoader />;
  }

  return (
    <SearchListComponent
      loading={storeList.status === 'loading'}
      dataType={dataType}
      data={storeList.data || []}
      onEndReached={storeList.getAll}
      onSelect={onSelect}
    />
  );
};

export default SearchListContainer;
