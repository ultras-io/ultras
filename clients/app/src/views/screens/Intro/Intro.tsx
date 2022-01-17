import React from 'react';
import { View, ImageBackground } from 'react-native';

import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import rootScreens from 'navigation/screens/rootScreens';

import Button, {
  SizeEnum as ButtonSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';

import bg from 'assets/images/bg.png';
import { IIntroProps } from './types';
import styles from './styles';
import gStyles from 'styles/styles';

const Intro: React.FC<IIntroProps> = () => {
  const { pushTo } = useNavigationWithParams();

  return (
    <ImageBackground source={bg} resizeMode="cover" style={gStyles.containerBg}>
      <UltrasText style={styles.logo} color="text">
        ultras
      </UltrasText>
      <UltrasText style={styles.text} color={'secondaryText'}>
        {I18n.t('splashText')}
      </UltrasText>
      <View style={styles.buttons}>
        <Button
          title={I18n.t('introLetMeIn')}
          onPress={() => pushTo(rootScreens.joinUs.name)}
          size={ButtonSize.Big}
          bgColor={'primary'}
        />
        <Button
          title={I18n.t('privacy')}
          onPress={() => pushTo(rootScreens.uikit.name)}
          size={ButtonSize.Default}
          appearance={ButtonAppearance.Minimal}
        />
      </View>
    </ImageBackground>
  );
};

export default Intro;
