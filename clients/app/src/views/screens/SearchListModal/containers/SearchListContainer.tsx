import React from 'react';
import { TeamViewModel } from '@ultras/view-models';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, SearchItem, dataTypeEnum } from '../types';

import buildFootballClubsStore from 'core/stores/footballClubs';
import buildNationalTeamsStore from 'core/stores/nationalTeams';

const footballClubsStore = buildFootballClubsStore();
const nationalTeamsStore = buildNationalTeamsStore();

const manipulateTeamItem = (item: TeamViewModel): SearchItem => ({
  id: item.id.toString(),
  name: item.name,
  logo: item.logo,
});

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
}) => {
  const [data, setData] = React.useState<Array<SearchItem>>([]);

  const [fetchData, manipulateItem] = React.useMemo(() => {
    switch (dataType) {
      case dataTypeEnum.Country:
        return [nationalTeamsStore.getAll, manipulateTeamItem];
      case dataTypeEnum.FootballClub:
        return [footballClubsStore.getAll, manipulateTeamItem];
      case dataTypeEnum.NationalTeam:
        return [nationalTeamsStore.getAll, manipulateTeamItem];
    }
  }, [dataType]);

  // console.log(searchText);

  const manipulate = React.useCallback(
    (list: Array<any>) => {
      setData(list.map(item => manipulateItem(item)));
    },
    [setData, manipulateItem]
  );

  const initData = React.useCallback(async () => {
    // setData([]);
    const newData = await fetchData();
    if (newData.status === 'success') {
      manipulate(newData.data!);
    }
  }, [manipulate, fetchData]);

  const getData = React.useCallback(async () => {
    const newData = await fetchData();
    if (newData.status === 'success') {
      manipulate(newData.data!);
    }
  }, [manipulate, fetchData]);

  React.useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return <SearchListComponent onEndReached={getData} data={data} />;
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
