import React from 'react';
import BackButtonComponent from '../../components/BackButtonComponent';
import CreateEventContainer from './containers/CreateEventContainer';

const CreateEvent: React.FC = () => {
  return (
    <>
      <BackButtonComponent action="close" />
      <CreateEventContainer />
    </>
  );
};

export default CreateEvent;
