import React, {useCallback} from 'react';
import {View} from 'react-native';

import useNavigationWithParams from 'hooks/useNavigationWithParams';
import Button from '../../components/base/Button';
import searchScreens from 'navigation/search/searchScreens';

import {ISearchEventProps} from './types';
import styles from './styles';

const SearchEvent: React.FC<ISearchEventProps> = () => {
  const {pushTo} = useNavigationWithParams();

  const navigateToEvent = useCallback(() => {
    pushTo(searchScreens.event.name);
  }, [pushTo]);

  return (
    <View style={styles.container}>
      <Button title="Push Event 22" onPress={navigateToEvent} />
    </View>
  );
};

export default SearchEvent;
