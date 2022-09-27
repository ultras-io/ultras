import React from 'react';
import CreateEventNavigation from './navigation';
import { ICreateEventWrapperProps } from './types';

const CreateEventWrapper: React.FC<ICreateEventWrapperProps> = ({ route }) => {
  const matchId = route?.params?.matchId || null;
  const tabName = route?.params?.tabName || null;

  return <CreateEventNavigation matchId={matchId} tabName={tabName} />;
};

export default CreateEventWrapper;
