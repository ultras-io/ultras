import React from 'react';
import {View, Text} from 'react-native';

import {IProfileProps} from './types';

import styles from './styles';

const Profile: React.FC<IProfileProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

export default Profile;
