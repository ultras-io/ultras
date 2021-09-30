import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {ITeamProps} from './types';

import styles from './styles';

const Team: React.FC<ITeamProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>{title}</UltrasText>
    </View>
  );
};

export default Team;
