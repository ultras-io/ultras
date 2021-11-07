import React from 'react';
import WithSafeArea from 'views/components/base/WithSafeArea';

import ProfileContainer from './containers/ProfileContainer';
import {IProfileProps} from './types';

const Profile: React.FC<IProfileProps> = ({route}) => {
  const {id} = route.params;

  return (
    <WithSafeArea>
      <ProfileContainer id={id} />
    </WithSafeArea>
  );
};

export default Profile;
