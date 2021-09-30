import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import Button from '../../components/base/Button';

import {IMatchProps} from './types';
import styles from './styles';

const Match: React.FC<IMatchProps> = ({route}) => {
  const {tabName} = route.params;

  const {pushTo} = useNavigationWithParams();

  const navigateToEvent = useCallback(() => {
    pushTo(commonScreens.event.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Single Match</Text>
      <Text>tab: {tabName}</Text>
      <Button title="Push Single Event" onPress={navigateToEvent} />
    </View>
  );
};

export default Match;
