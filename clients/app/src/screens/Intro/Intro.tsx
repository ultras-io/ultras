import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

import Button from 'components/base/Button';

import screens from 'navigation/root/rootScreens';

import {IIntroProps} from './types';

import styles from './styles';

const Intro: React.FC<IIntroProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToJoinUs = useCallback(() => {
    pushTo(screens.joinUs.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro</Text>
      <Button title="Push JoinUs" onPress={navigateToJoinUs} />
    </View>
  );
};

export default Intro;
