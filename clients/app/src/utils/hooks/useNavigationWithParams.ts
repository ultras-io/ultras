import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const useNavigationWithParams = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const tabName = route.params?.tabName ?? '';
  const prefix = tabName ? tabName + ':' : '';

  const pushTo = React.useCallback(
    (name: string, params?: any) => {
      navigation.push(prefix + name, {tabName, ...params});
    },
    [navigation, prefix, tabName],
  );

  const openModal = React.useCallback(
    (name: string, params?: any) => {
      navigation.navigate(name, {...params});
    },
    [navigation],
  );

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const changeTab = React.useCallback(
    (tab: string) => {
      navigation.navigate(tab);
    },
    [navigation],
  );

  const setOptions = React.useCallback(
    (options: any) => {
      navigation.setOptions(options);
    },
    [navigation],
  );

  return {
    pushTo,
    openModal,
    goBack,
    changeTab,
    setOptions,
  };
};

export default useNavigationWithParams;
