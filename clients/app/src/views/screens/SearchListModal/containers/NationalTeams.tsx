import React from 'react';
import SearchListContainer from './SearchListContainer';
import { dataTypeEnum } from '../types';

const NationalTeams = ({ searchText }: { searchText: string }) => (
  <SearchListContainer searchText={searchText} dataType={dataTypeEnum.NationalTeam} />
);
export default NationalTeams;
