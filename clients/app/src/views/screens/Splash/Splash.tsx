import React from 'react';
import {ImageBackground} from 'react-native';

import I18n from 'i18n/i18n';
import UltrasText from 'views/components/base/UltrasText';

import {ISplashProps} from './types';
import styles from './styles';
import gStyles from 'styles/styles';

import bg from '../../../assets/images/bg.png';

const Splash: React.FC<ISplashProps> = ({setIsLoading}) => {
  // check
  setTimeout(() => {
    setIsLoading(true);
  }, 2000);

  return (
    <ImageBackground source={bg} resizeMode="cover" style={gStyles.containerBg}>
      <UltrasText style={styles.logo} color="text">
        ultras
      </UltrasText>
      <UltrasText style={styles.text} color={'secondaryText'}>
        {I18n.t('introWelcome')}
      </UltrasText>
    </ImageBackground>
  );
};

export default Splash;
