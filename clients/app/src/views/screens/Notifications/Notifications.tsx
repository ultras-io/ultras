import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {INotificationsProps} from './types';

import styles from './styles';

const Notifications: React.FC<INotificationsProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText>Notifications</UltrasText>
    </View>
  );
};

export default Notifications;
