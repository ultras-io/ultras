import React from 'react';
import { Button } from 'native-base';
import initAuthStore, { IState } from 'stores/authentication';
// import ProfileComponent from '../components/ProfileComponent';
import { IProfileContainerProps } from '../types';

const useAuthenticationStore = initAuthStore();

const ProfileContainer: React.FC<IProfileContainerProps> = ({ id }) => {
  const logoutSelector = React.useCallback(() => (state: IState) => state.logout, []);
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);

  const logout = useAuthenticationStore(logoutSelector());
  const user = useAuthenticationStore(userSelector());

  return (
    <Button onPress={logout} variant={'action'} m={10}>
      {'sign out ' + user?.username}
    </Button>
  );
};

export default ProfileContainer;
