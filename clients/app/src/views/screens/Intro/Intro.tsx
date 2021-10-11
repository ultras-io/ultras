import React, {useCallback} from 'react';
import {View, ImageBackground} from 'react-native';

import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import screens from 'navigation/root/rootScreens';

import Button, {
  SizeEnum as ButtonSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';

import {IIntroProps} from './types';
import styles from './styles';

const Intro: React.FC<IIntroProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToJoinUs = useCallback(() => {
    pushTo(screens.joinUs.name);
  }, [pushTo]);

  const navigateToUIKit = useCallback(() => {
    pushTo(screens.uikit.name);
  }, [pushTo]);

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      resizeMode="cover"
      style={styles.bg}>
      <UltrasText style={styles.logo} color={'text'}>
        ultras
      </UltrasText>
      <UltrasText style={styles.text} color={'secondaryText'}>
        {I18n.t('splashText')}
      </UltrasText>
      <View style={styles.buttons}>
        <Button
          title={I18n.t('introLetMeIn')}
          onPress={navigateToJoinUs}
          size={ButtonSize.Big}
          bgColor={'primary'}
        />
        <Button
          title={I18n.t('privacy')}
          onPress={navigateToUIKit}
          size={ButtonSize.Default}
          appearance={ButtonAppearance.Minimal}
        />
      </View>
    </ImageBackground>
  );
};

export default Intro;
