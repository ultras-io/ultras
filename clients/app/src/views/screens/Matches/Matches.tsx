import React, {useCallback} from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import matchesScreens from 'navigation/matches/matchesScreens';
import Button from 'views/components/base/Button';

import {IMatchesProps} from './types';
import styles from './styles';

const Matches: React.FC<IMatchesProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(matchesScreens.match.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Matches</UltrasText>
      <Button title="Push Single Match" onPress={navigateToMatch} />
    </View>
  );
};

export default Matches;
