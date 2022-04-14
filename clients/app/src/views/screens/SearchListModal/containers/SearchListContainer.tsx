import React from 'react';
import SearchListComponent from '../components/SearchListComponent';
import { ISearchListContainerProps, SearchItem, dataTypeEnum } from '../types';

import { generateClubsList, generateTeamsList } from 'utils/helpers/dummy';


const SearchListContainer: React.FC<ISearchListContainerProps> = ({
  dataType,
  searchText,
}) => {
  const [data, setData] = React.useState<Array<SearchItem>>([]);

  const fetchData = React.useMemo(() => {
    switch (dataType) {
      case dataTypeEnum.Country:
        return generateTeamsList;
      case dataTypeEnum.FootballClub:
        return generateClubsList;
      case dataTypeEnum.NationalTeam:
        return generateTeamsList;
    }
  }, [dataType]);

  // console.log(searchText);

  const initData = React.useCallback(() => {
    setData([]);
    const newData = fetchData(50);
    setData(newData);
  }, [setData, fetchData]);

  const getData = React.useCallback(() => {
    const newData = fetchData(50);
    setData([...data, ...newData]);
  }, [setData, data, fetchData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(initData, [searchText]);

  return <SearchListComponent onEndReached={getData} data={data} />;
};

export default React.memo<ISearchListContainerProps>(SearchListContainer);
