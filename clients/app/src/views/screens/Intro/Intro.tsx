import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import screens from 'navigation/root/rootScreens';

import Button from '../../components/base/Button';

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
      <Text style={styles.text}>Intro</Text>

      <Button title="Push JoinUs" onPress={navigateToJoinUs} />
      <Button title="UI Kit" onPress={navigateToUIKit} />
    </View>
  );
};

export default Intro;
