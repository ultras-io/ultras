import React from 'react';
import SearchListContainer from './SearchListContainer';
import { dataTypeEnum } from '../types';
import { useFilter } from '../contexts/FilterContext';

const FootballClubs = () => {
  const { filter } = useFilter();

  return (
    <SearchListContainer
      dataType={dataTypeEnum.FootballClub}
      searchText={filter?.searchText}
    />
  );
};

export default FootballClubs;
