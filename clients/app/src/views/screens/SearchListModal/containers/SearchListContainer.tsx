import React from 'react';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, dataTypeEnum } from '../types';
import buildFootballClubsStore from 'stores/footballClubs';
import buildNationalTeamsStore from 'stores/nationalTeams';

const footballClubsStore = buildFootballClubsStore();
const nationalTeamsStore = buildNationalTeamsStore();

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
}) => {
  const store = React.useMemo(() => {
    switch (dataType) {
      case dataTypeEnum.Country:
        return nationalTeamsStore;
      case dataTypeEnum.FootballClub:
        return footballClubsStore;
      case dataTypeEnum.NationalTeam:
        return nationalTeamsStore;
    }
  }, [dataType]);

  const result = store.useSelector('list');

  const updateData = React.useCallback(() => {
    store.updateFilter({ name: searchText });
    store.getAll();
  }, [store, searchText]);

  React.useEffect(updateData, [updateData, searchText]);

  return (
    <SearchListComponent onEndReached={store.getAll} data={result.list.data || []} />
  );
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
