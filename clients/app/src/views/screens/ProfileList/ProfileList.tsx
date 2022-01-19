import React from 'react';
import WithSafeArea from 'views/components/base/WithSafeArea';

import ProfileListContainer from './containers/ProfileListContainer';
import { IProfileListProps } from './types';

const ProfileList: React.FC<IProfileListProps> = ({ route }) => {
  const { title } = route.params;

  return (
    <WithSafeArea>
      <ProfileListContainer title={title} />
    </WithSafeArea>
  );
};

export default ProfileList;
