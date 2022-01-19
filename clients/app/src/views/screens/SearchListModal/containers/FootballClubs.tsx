import React from 'react';
import SearchListContainer from './SearchListContainer';
import { dataTypeEnum } from '../types';

const FootballClubs = ({ searchText }: { searchText: string }) => (
  <SearchListContainer searchText={searchText} dataType={dataTypeEnum.FootballClub} />
);
export default FootballClubs;
