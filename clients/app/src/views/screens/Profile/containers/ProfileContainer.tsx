import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import { IProfileContainerProps } from '../types';

const ProfileContainer: React.FC<IProfileContainerProps> = ({ data }) => {
  return <ProfileComponent data={data} />;
};

export default React.memo<IProfileContainerProps>(ProfileContainer);
