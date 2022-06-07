import React from 'react';
import { ISearchItemProps } from './types';
import Container from 'views/components/base/Container';

const SearchItemContainer = React.lazy(() => import('./containers/SearchItemContainer'));

const SearchItem: React.FC<ISearchItemProps> = ({ searchItem, searchText }) => {
  return (
    <Container withSuspense withBg bgSize="lg">
      <SearchItemContainer searchItem={searchItem} searchText={searchText} />
    </Container>
  );
};

export default React.memo<ISearchItemProps>(SearchItem);
