import React, {useCallback} from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import screens from 'navigation/root/rootScreens';

import Button from 'views/components/base/Button';

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
    <View style={styles.container}>
      <UltrasText style={styles.text}>Intro</UltrasText>

      <Button title="Push JoinUs" onPress={navigateToJoinUs} />
      <Button title="UI Kit" onPress={navigateToUIKit} />
    </View>
  );
};

export default Intro;
