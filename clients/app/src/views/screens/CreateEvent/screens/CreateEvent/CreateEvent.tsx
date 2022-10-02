import React from 'react';
import BackButton from 'views/components/base/BackButton';
import CreateEventContainer from './containers/CreateEventContainer';

const CreateEvent: React.FC = () => {
  return (
    <>
      <BackButton action="close" type="text" />
      <CreateEventContainer />
    </>
  );
};

export default CreateEvent;
