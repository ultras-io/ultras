import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import Button from 'components/base/Button';

import {IEventsProps} from './types';

import styles from './styles';

const Events: React.FC<IEventsProps> = () => {
  const openNewEventModal = useCallback(() => {
    console.log('Open New Event Modal');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Events</Text>
      <Button title={'Open New Event Modal'} onPress={openNewEventModal} />
    </View>
  );
};

export default Events;
