import React from 'react';
import {View, Text} from 'react-native';

import {IEventProps} from './types';

import styles from './styles';

const Event: React.FC<IEventProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Single Event</Text>
    </View>
  );
};

export default Event;
