import React from 'react';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SearchListContainer from './containers/SearchListContainer';
import {ISearchListModalProps} from './types';

const SearchListModal: React.FC<ISearchListModalProps> = ({route}) => {
  const {goBack} = useNavigationWithParams();
  const {key} = route.params;

  return <SearchListContainer dataKey={key} onClose={goBack} />;
};

export default React.memo<ISearchListModalProps>(SearchListModal);
