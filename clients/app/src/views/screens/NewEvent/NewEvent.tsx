import React from 'react';
import { View } from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import { INewEventProps } from './types';

import styles from './styles';

const NewEvent: React.FC<INewEventProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>New Event Screen</UltrasText>
    </View>
  );
};

export default NewEvent;
