import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import homeScreens from '../../navigation/home/homeScreens';
import tabScreens from '../../navigation/tab/tabScreens';

import Button from 'components/base/Button';

import {IHomeProps} from './types';
import styles from './styles';

const Home: React.FC<IHomeProps> = () => {
  const navigation = useNavigation<any>();

  const navigateToMatch = useCallback(() => {
    navigation.navigate(homeScreens.match.name);
  }, [navigation]);

  const navigateToEvent = useCallback(() => {
    navigation.navigate(homeScreens.event.name);
  }, [navigation]);

  const navigateToMatches = useCallback(() => {
    navigation.navigate(tabScreens.matches.name);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <TouchableWithoutFeedback onPress={navigateToMatch}>
        <Text>Push Single Match</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={navigateToEvent}>
        <Text>Push Event</Text>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={navigateToMatches}>
        <Text>Navigate to Matches</Text>
      </TouchableWithoutFeedback>
      <Button title="2x" />
    </View>
  );
};

export default Home;
