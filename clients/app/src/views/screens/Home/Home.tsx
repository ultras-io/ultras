import React, {useCallback} from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Button from 'views/components/base/Button';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

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
      <UltrasText style={styles.text}>Home</UltrasText>

      <Button title="Push Single Match" onPress={navigateToMatch} />
      <Button title="Push Event" onPress={navigateToEvent} />
      <Button title="Navigate to Matches" onPress={navigateToMatches} />
    </View>
  );
};

export default Home;
