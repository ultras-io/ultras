import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import matchesScreens from '../../navigation/matches/matchesScreens';

import {IMatchesProps} from './types';
import styles from './styles';

const Matches: React.FC<IMatchesProps> = () => {
  const navigation = useNavigation<any>();

  const navigateToMatch = useCallback(() => {
    navigation.navigate(matchesScreens.match.name);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matches</Text>

      <TouchableWithoutFeedback onPress={navigateToMatch}>
        <Text>Push Single Match</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Matches;
