import React, {useCallback} from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import Button from 'views/components/base/Button';

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
      <UltrasText style={styles.text}>Single Match</UltrasText>
      <UltrasText>tab: {tabName}</UltrasText>
      <Button title="Push Single Event" onPress={navigateToEvent} />
    </View>
  );
};

export default Match;
