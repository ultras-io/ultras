import React from 'react';
import { Alert } from 'react-native';
import { Actionsheet } from 'native-base';
import I18n from 'i18n/i18n';
import authenticationStore, { IState } from 'stores/authentication';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import profileScreens from 'views/navigation/screens/profileScreens';
import rootScreens from 'views/navigation/screens/rootScreens';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import { IMenuActionSheetProps } from '../types';

const MenuActionSheet: React.FC<IMenuActionSheetProps> = ({
  useStore,
  isOpen,
  onClose,
}) => {
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const logout = useStore(authenticationStore.logoutSelector());
  const user = useStore(userSelector());
  const { pushTo, openModal } = useNavigationWithParams();

  const closeAndNavigateTo = React.useCallback(
    (screen, underTab = true) => {
      onClose();
      setTimeout(() => {
        underTab ? pushTo(screen) : openModal(screen);
      });
    },
    [onClose, pushTo, openModal]
  );

  const openLogoutAlert = React.useCallback(() => {
    Alert.alert(I18n.t('profile-logoutOfX', { x: user.username }), '', [
      { text: I18n.t('common-cancel') },
      { text: I18n.t('profile-logout'), onPress: logout, style: 'destructive' },
    ]);
  }, [user.username, logout]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Settings} color={'iconPrimary'} size={'ic-md'} />}
          onPress={() => closeAndNavigateTo(profileScreens.settings.name)}
        >
          {I18n.t('profile-settings')}
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Edit} color={'iconPrimary'} size={'ic-md'} />}
          onPress={() => closeAndNavigateTo(profileScreens.editProfile.name)}
        >
          {I18n.t('profile-edit')}
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Catch} color={'iconPrimary'} size={'ic-md'} />}
        >
          Your activity
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Doc} color={'iconPrimary'} size={'ic-md'} />}
          onPress={() => closeAndNavigateTo(rootScreens.privacy.name, false)}
        >
          {I18n.t('common-privacy')}
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={<Icon name={Icons.Exit} color={'iconPrimary'} size={'ic-md'} />}
          onPress={openLogoutAlert}
        >
          {I18n.t('profile-logout') + ' ' + user.username}
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo<IMenuActionSheetProps>(MenuActionSheet);
