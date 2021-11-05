import {useNavigation, useRoute} from '@react-navigation/native';

const useNavigationWithParams = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const tabName = route.params?.tabName ?? '';
  const prefix = tabName ? tabName + ':' : '';

  const pushTo = (name: string, params?: any) => {
    navigation.push(prefix + name, {tabName, ...params});
  };

  const openModal = (name: string, params?: any) => {
    navigation.navigate(name, {...params});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const changeTab = (tab: string) => {
    navigation.navigate(tab);
  };

  const setOptions = (options: any) => {
    navigation.setOptions(options);
  };

  return {
    pushTo,
    openModal,
    goBack,
    changeTab,
    setOptions,
  };
};

export default useNavigationWithParams;
