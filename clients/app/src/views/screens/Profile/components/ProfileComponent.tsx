import React from 'react';
import ProfileInfo from 'views/screens/Profile/components/ProfileInfo';
import { IProfileComponentProps } from '../types';

const ProfileComponent: React.FC<IProfileComponentProps> = ({ data }) => {
  return <ProfileInfo data={data} />;
};

export default ProfileComponent;
