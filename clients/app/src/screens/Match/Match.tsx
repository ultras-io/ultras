import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// import matchesScreens from '../../navigation/matches/matchesScreens';

import {IMatchProps} from './types';
import styles from './styles';

const Match: React.FC<IMatchProps> = () => {
  // const navigation = useNavigation<any>();

  const navigateToEvent = useCallback(() => {
    // navigation.navigate(matchesScreens.event.name);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Single Match</Text>

      <TouchableWithoutFeedback onPress={navigateToEvent}>
        <Text>Push Single Event</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Match;
