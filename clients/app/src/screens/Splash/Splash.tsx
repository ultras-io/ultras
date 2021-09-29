import React from 'react';
import {View, Text} from 'react-native';

import {ISplashProps} from './types';

import styles from './styles';

const Splash: React.FC<ISplashProps> = ({setIsLoading}) => {
  // check
  setTimeout(() => {
    setIsLoading(true);
  }, 1500);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash</Text>
    </View>
  );
};

export default Splash;
