import React from 'react';
import SearchListContainer from './SearchListContainer';
import { dataTypeEnum } from '../types';

const Countries = ({ searchText }: { searchText: string }) => (
  <SearchListContainer searchText={searchText} dataType={dataTypeEnum.Country} />
);
export default Countries;
