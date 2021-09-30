import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {ISplashProps} from './types';

import styles from './styles';

const Splash: React.FC<ISplashProps> = ({setIsLoading}) => {
  // check
  setTimeout(() => {
    setIsLoading(true);
  }, 1500);

  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Splash</UltrasText>
    </View>
  );
};

export default Splash;
