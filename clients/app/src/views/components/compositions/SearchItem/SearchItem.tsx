import React from 'react';
import Box from 'views/components/base/Box';
import SearchItemContainer from './containers/SearchItemContainer';
import { ISearchItemProps } from './types';

const SearchItem: React.FC<ISearchItemProps> = ({ searchItem, searchText }) => {
  return (
    <Box bgColor="backgroundMain">
      <SearchItemContainer searchItem={searchItem} searchText={searchText} />
    </Box>
  );
};

export default React.memo<ISearchItemProps>(SearchItem);
