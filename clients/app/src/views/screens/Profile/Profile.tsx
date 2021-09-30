import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {IProfileProps} from './types';

import styles from './styles';

const Profile: React.FC<IProfileProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Profile</UltrasText>
    </View>
  );
};

export default Profile;
