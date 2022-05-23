import React from 'react';
import { TeamTypesEnum } from '@ultras/utils';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, dataTypeEnum } from '../types';
import buildTeamsStore from 'stores/teams';

const footballClubsStore = buildTeamsStore({
  immutableFilter: {
    type: TeamTypesEnum.club,
  },
});

const nationalTeamsStore = buildTeamsStore({
  immutableFilter: {
    type: TeamTypesEnum.national,
  },
});

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
