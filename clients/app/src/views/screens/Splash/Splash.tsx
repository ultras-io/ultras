import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';

import UltrasText from 'views/components/base/UltrasText';

import { ISplashProps } from './types';
import styles from './styles';
import gStyles from 'styles/styles';

import bg from 'assets/images/bg.png';

const Splash: React.FC<ISplashProps> = ({ setIsLoading }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, []);

  return (
    <ImageBackground source={bg} resizeMode="cover" style={gStyles.containerBg}>
      <UltrasText style={styles.logo} color="white">
        ultras
      </UltrasText>
    </ImageBackground>
  );
};

export default Splash;
