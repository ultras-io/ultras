import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {ISearchTeamProps} from './types';

import styles from './styles';

const SearchTeam: React.FC<ISearchTeamProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Search Team</UltrasText>
    </View>
  );
};

export default SearchTeam;
