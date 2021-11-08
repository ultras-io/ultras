import React from 'react';

import ProfileComponent from '../components/ProfileComponent';

import {generateProfile} from 'utils/helpers/dummy';

import {IProfileContainerProps} from '../types';

const ProfileContainer: React.FC<IProfileContainerProps> = ({id}) => {
  // get Profiles's data by id
  const data = generateProfile();

  return <ProfileComponent data={data} />;
};

export default ProfileContainer;
