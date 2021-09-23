import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import screens from '../../navigation/root/rootScreens';

import {IIntroProps} from './types';

import styles from './styles';

const Intro: React.FC<IIntroProps> = () => {
  const navigation = useNavigation<any>();

  const navigateToJoinUs = useCallback(() => {
    navigation.navigate(screens.joinUs.name);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro</Text>
      <TouchableWithoutFeedback onPress={navigateToJoinUs}>
        <Text>Push JoinUs</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Intro;
