import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import SearchTabNavigation from 'navigation/searchTab/searchTabNavigation';

import {ISearchProps} from './types';

import styles from './styles';

const Search: React.FC<ISearchProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Search input here..</UltrasText>
      <SearchTabNavigation />
    </View>
  );
};

export default Search;
