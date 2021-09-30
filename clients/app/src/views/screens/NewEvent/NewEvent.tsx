import React from 'react';
import {View, Text} from 'react-native';

import {INewEventProps} from './types';

import styles from './styles';

const NewEvent: React.FC<INewEventProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Event Screen</Text>
    </View>
  );
};

export default NewEvent;
