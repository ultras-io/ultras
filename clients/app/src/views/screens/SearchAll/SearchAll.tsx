import React, {useCallback} from 'react';
import {View} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Button from 'views/components/base/Button';
import searchScreens from 'navigation/search/searchScreens';

import {ISearchAllProps} from './types';
import styles from './styles';

const SearchAll: React.FC<ISearchAllProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToEvent = useCallback(() => {
    pushTo(searchScreens.event.name);
  }, [pushTo]);

  const navigateToMatch = useCallback(() => {
    pushTo(searchScreens.match.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Button title="Push Event" onPress={navigateToEvent} />
      <Button title="Push Match" onPress={navigateToMatch} />
    </View>
  );
};

export default SearchAll;
