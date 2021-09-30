import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/base/Button';

import useNavigationWithParams from 'hooks/useNavigationWithParams';

import homeScreens from 'navigation/home/homeScreens';
import tabScreens from 'navigation/tab/tabScreens';

import {IHomeProps} from './types';
import styles from './styles';

const Home: React.FC<IHomeProps> = () => {
  const {pushTo, changeTab} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(homeScreens.match.name);
  }, [pushTo]);

  const navigateToEvent = useCallback(() => {
    pushTo(homeScreens.event.name);
  }, [pushTo]);

  const navigateToMatches = useCallback(() => {
    changeTab(tabScreens.matches.name);
  }, [changeTab]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>

      <Button title="Push Single Match" onPress={navigateToMatch} />
      <Button title="Push Event" onPress={navigateToEvent} />
      <Button title="Navigate to Matches" onPress={navigateToMatches} />
    </View>
  );
};

export default Home;
