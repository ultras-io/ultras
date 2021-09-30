import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import matchesScreens from 'navigation/matches/matchesScreens';
import Button from '../../components/base/Button';

import {IMatchesProps} from './types';
import styles from './styles';

const Matches: React.FC<IMatchesProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(matchesScreens.match.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matches</Text>
      <Button title="Push Single Match" onPress={navigateToMatch} />
    </View>
  );
};

export default Matches;
