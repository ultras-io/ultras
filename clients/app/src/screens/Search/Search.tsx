import React from 'react';
import {View, Text} from 'react-native';

import SearchTabNavigation from 'navigation/searchTab/searchTabNavigation';

import {ISearchProps} from './types';

import styles from './styles';

const Search: React.FC<ISearchProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search input here..</Text>
      <SearchTabNavigation />
    </View>
  );
};

export default Search;
