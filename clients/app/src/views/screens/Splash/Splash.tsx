import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Text } from 'native-base';
import { ISplashProps } from './types';
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
      <Text variant="logo" marginBottom={210}>
        ultras
      </Text>
    </ImageBackground>
  );
};

export default Splash;
