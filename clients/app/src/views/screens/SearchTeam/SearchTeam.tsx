import React from 'react';
import {View, Text} from 'react-native';

import {ISearchTeamProps} from './types';

import styles from './styles';

const SearchTeam: React.FC<ISearchTeamProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Team</Text>
    </View>
  );
};

export default SearchTeam;
