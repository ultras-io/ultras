import React from 'react';

import ProfileInfo from 'views/components/compositions/ProfileInfo';

import { IProfileComponentProps } from '../types';

const ProfileComponent: React.FC<IProfileComponentProps> = ({ data }) => {
  return (
    <ProfileInfo
      avatarUri={data.avatarUri}
      name={data.name}
      username={data.username}
      teams={data.teams}
      fanClubs={data.fanClubs}
    />
  );
};

export default ProfileComponent;
