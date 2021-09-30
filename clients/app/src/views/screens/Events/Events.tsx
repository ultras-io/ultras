import React, {useCallback} from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import screens from 'navigation/events/eventsScreens';
import Button from 'views/components/base/Button';

import {IEventsProps} from './types';
import styles from './styles';

const Events: React.FC<IEventsProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const openNewEventModal = useCallback(() => {
    pushTo(screens.newEvent.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Events</UltrasText>
      <Button title={'Open New Event Modal'} onPress={openNewEventModal} />
    </View>
  );
};

export default Events;
