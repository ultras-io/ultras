import React from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { Text } from 'native-base';
import authenticationStore from 'stores/authentication';
import { ISplashProps } from './types';
import gStyles from 'styles/styles';

const bg = require('assets/images/bg.png');

const Splash: React.FC<ISplashProps> = ({ useStore }) => {
  const authenticate = useStore(authenticationStore.authenticateSelector());

  React.useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground source={bg} resizeMode="cover" style={gStyles.containerBg}>
        <Text variant="logo" marginBottom={210}>
          ultras
        </Text>
      </ImageBackground>
    </>
  );
};

export default Splash;
