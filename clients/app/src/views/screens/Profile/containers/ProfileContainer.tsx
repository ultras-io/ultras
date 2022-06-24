import React from 'react';
import { IState } from 'stores/authentication';
import ProfileComponent from '../components/ProfileComponent';
import { IProfileContainerProps } from '../types';

const ProfileContainer: React.FC<IProfileContainerProps> = ({ useStore, id }) => {
  // get user if id exist
  // else

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useStore(userSelector());

  return <ProfileComponent data={user} />;
};

export default ProfileContainer;
