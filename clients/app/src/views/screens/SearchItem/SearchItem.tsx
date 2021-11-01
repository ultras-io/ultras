import React from 'react';
import Box from 'views/components/base/Box';

import SearchItemContainer from './containers/SearchItemContainer';

// import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import searchScreens from 'navigation/search/searchScreens';

import {ISearchItemProps} from './types';

const SearchItem: React.FC<ISearchItemProps> = ({searchItem, searchText}) => {
  // const {pushTo} = useNavigationWithParams();
  // const navigateToEvent = React.useCallback(() => {
  //   pushTo(searchScreens.event.name);
  // }, [pushTo]);

  return (
    <Box bgColor="bgColor">
      <SearchItemContainer searchItem={searchItem} searchText={searchText} />
    </Box>
  );
};

export default React.memo<ISearchItemProps>(SearchItem);
