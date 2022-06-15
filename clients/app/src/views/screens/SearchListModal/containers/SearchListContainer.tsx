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

  const updateData = React.useCallback(() => {
    store.updateFilter({ name: searchText, limit: 40 });
    store.getAll();
  }, [store, searchText]);

  React.useLayoutEffect(updateData, [updateData, searchText]);

  const result = store.useSelector('list');

  // console.log(!result.list.data && result.list.status === 'loading');

  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <SearchListLoader />;

  return (
    <SearchListComponent
      dataType={dataType}
      data={result.list.data || []}
      onEndReached={store.getAll}
      onSelect={onSelect}
    />
  );
};

export default SearchListContainer;
