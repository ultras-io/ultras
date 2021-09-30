import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import screens from 'navigation/events/eventsScreens';
import Button from '../../components/base/Button';

import {IEventsProps} from './types';
import styles from './styles';

const Events: React.FC<IEventsProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const openNewEventModal = useCallback(() => {
    pushTo(screens.newEvent.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Events</Text>
      <Button title={'Open New Event Modal'} onPress={openNewEventModal} />
    </View>
  );
};

export default Events;
