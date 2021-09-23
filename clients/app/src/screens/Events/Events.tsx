import React from 'react';
import {View, Text} from 'react-native';

import {IEventsProps} from './types';

import styles from './styles';

const Events: React.FC<IEventsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Events</Text>
    </View>
  );
};

export default Events;
