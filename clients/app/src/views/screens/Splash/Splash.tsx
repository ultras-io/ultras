import React from 'react';
import {ImageBackground} from 'react-native';

import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

import {ISplashProps} from './types';
import styles from './styles';

const Splash: React.FC<ISplashProps> = ({setIsLoading}) => {
  // check
  setTimeout(() => {
    setIsLoading(true);
  }, 2000);

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      resizeMode="cover"
      style={styles.bg}>
      <UltrasText style={styles.logo} color={'lightText'}>
        ultras
      </UltrasText>
      <UltrasText style={styles.text} color={'lightText'}>
        {I18n.t('introWelcome')}
      </UltrasText>
    </ImageBackground>
  );
};

export default Splash;
