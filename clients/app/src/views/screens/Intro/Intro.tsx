import React from 'react';
import { ImageBackground } from 'react-native';
import { Button, Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import rootScreens from 'views/navigation/screens/rootScreens';
import { IIntroProps } from './types';
import gStyles from 'styles/styles';

const bg = require('assets/images/bg.png');

const Intro: React.FC<IIntroProps> = () => {
  const { pushTo } = useNavigationWithParams();

  return (
    <ImageBackground source={bg} resizeMode="cover" style={gStyles.containerBg}>
      <Text variant={'logo'}>ultras</Text>
      <Text variant={'subTitle'}>{I18n.t('splash-slogan')}</Text>
      <VStack mt={10} mb={10} space={5} w={'80%'}>
        <Button
          onPress={preventMultiCalls(() => pushTo(rootScreens.joinUs.name))}
          variant={'primary'}
        >
          {I18n.t('intro-letMeIn')}
        </Button>
        <Button
          onPress={preventMultiCalls(() => pushTo(rootScreens.privacy.name))}
          variant={'empty'}
        >
          {I18n.t('common-privacy')}
        </Button>
      </VStack>
    </ImageBackground>
  );
};

export default Intro;
