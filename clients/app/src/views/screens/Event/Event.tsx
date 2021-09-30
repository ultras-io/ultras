import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import Button from 'views/components/base/Button';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import {IEventProps} from './types';
import styles from './styles';

const Event: React.FC<IEventProps> = ({route}) => {
  const {tabName} = route.params;
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(commonScreens.match.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Single Event</Text>
      <Text>tab: {tabName}</Text>
      <Button title="Push Single Match" onPress={navigateToMatch} />
    </View>
  );
};

export default Event;
