/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useMemo, useRef } from 'react';
import { TeamViewModel } from '@ultras/view-models';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, SearchItem, dataTypeEnum } from '../types';

import buildTeamsStore from 'stores/teams';
import { TeamTypesEnum } from '@ultras/utils';

const manipulateTeamItem = (item: TeamViewModel): SearchItem => ({
  id: item.id.toString(),
  name: item.name,
  logo: item.logo,
});

const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
}) => {
  const refTimer = useRef<NodeJS.Timeout>();

  const [data, setData] = React.useState<Array<SearchItem>>([]);

  const { footballClubsStore, nationalTeamsStore } = useMemo(
    () => ({
      footballClubsStore: buildTeamsStore({
        immutableFilter: { type: TeamTypesEnum.club },
      }),
      nationalTeamsStore: buildTeamsStore({
        immutableFilter: { type: TeamTypesEnum.national },
      }),
    }),
    []
  );

  const { fetchData, updateFilter, manipulateItem } = useMemo(() => {
    switch (dataType) {
      case dataTypeEnum.Country:
        return {
          fetchData: nationalTeamsStore.getAll,
          updateFilter: nationalTeamsStore.updateFilter,
          manipulateItem: manipulateTeamItem,
        };
      case dataTypeEnum.FootballClub:
        return {
          fetchData: footballClubsStore.getAll,
          updateFilter: footballClubsStore.updateFilter,
          manipulateItem: manipulateTeamItem,
        };
      case dataTypeEnum.NationalTeam:
        return {
          fetchData: nationalTeamsStore.getAll,
          updateFilter: nationalTeamsStore.updateFilter,
          manipulateItem: manipulateTeamItem,
        };
    }
  }, [dataType]);

  const manipulate = React.useCallback(
    (list: Array<any>) => {
      setData(list.map(item => manipulateItem(item)));
    },
    [setData, manipulateItem]
  );

  const getData = React.useCallback(async () => {
    const newData = await fetchData();
    if (newData.status === 'success') {
      manipulate(newData.data!);
    }
  }, [manipulate, fetchData]);

  useEffect(() => {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }

    refTimer.current = setTimeout(() => {
      updateFilter({ name: searchText } as any);
      getData();
    }, 300);
  }, [searchText]);

  return <SearchListComponent onEndReached={getData} data={data} />;
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
