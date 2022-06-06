import React from 'react';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, dataTypeEnum } from '../types';
import buildCountriesStore from 'stores/countries';
import buildTeamsStore from 'stores/teams';

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
}) => {
  const store = React.useMemo(() => {
    switch (dataType) {
      case dataTypeEnum.Country:
        return buildCountriesStore();
      case dataTypeEnum.Team:
        return buildTeamsStore();
    }
  }, [dataType]);

  const updateData = React.useCallback(() => {
    store.updateFilter({ name: searchText });
    store.getAll();
  }, [store, searchText]);

  React.useEffect(updateData, [updateData, searchText]);

  const result = store.useSelector('list');

  return (
    <SearchListComponent
      dataType={dataType}
      data={result.list.data || []}
      onEndReached={store.getAll}
    />
  );
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
