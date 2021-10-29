import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import UltrasText from 'views/components/base/UltrasText';

import SearchTabNavigation from 'navigation/searchTab/searchTabNavigation';

import {ISearchProps} from './types';
import styles from './styles';

const Search: React.FC<ISearchProps> = () => {
  return (
    <WithSafeArea>
      <UltrasText style={styles.text}>Search input here..</UltrasText>
      <SearchTabNavigation />
    </WithSafeArea>
  );
};

export default Search;
