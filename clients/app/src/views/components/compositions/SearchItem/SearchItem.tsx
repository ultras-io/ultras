import React from 'react';
import { ISearchItemProps } from './types';

const SearchItemContainer = React.lazy(() => import('./containers/SearchItemContainer'));

const SearchItem: React.FC<ISearchItemProps> = ({ searchItem, searchText }) => {
  return <SearchItemContainer searchItem={searchItem} searchText={searchText} />;
};

export default React.memo<ISearchItemProps>(SearchItem);
