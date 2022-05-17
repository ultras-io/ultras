import React from 'react';
import SearchListContainer from './SearchListContainer';
import { dataTypeEnum } from '../types';
import { useFilter } from '../contexts/FilterContext';

const NationalTeams = () => {
  const { filter } = useFilter();

  return (
    <SearchListContainer
      dataType={dataTypeEnum.NationalTeam}
      searchText={filter?.searchText}
    />
  );
};

export default NationalTeams;
