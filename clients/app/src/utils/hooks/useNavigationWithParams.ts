import {useNavigation, useRoute} from '@react-navigation/native';

const useNavigationWithParams = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const tabName = route.params?.tabName ?? '';
  const prefix = tabName ? tabName + ':' : '';

  const pushTo = (name: string) => {
    navigation.push(prefix + name, {tabName});
  };

  const openModal = (name: string, params?: any) => {
    navigation.navigate(name, {...params});
  };

  const goBack = () => {
    navigation.goBack();
  };

  const changeTab = (tab: string) => {
    navigation.navigate(`${tab}`);
  };

  return {
    pushTo,
    openModal,
    goBack,
    changeTab,
  };
};

export default useNavigationWithParams;
