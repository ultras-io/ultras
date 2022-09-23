import React from 'react';
import buildEventsStore from 'stores/events/events';
import CreateEventComponent from '../components/CreateEventComponent';

const eventsStore = buildEventsStore();

const CreateEventContainer: React.FC = () => {
  // eventsStore.setAddFieldValue('title', 'a');

  const { add } = eventsStore.useSelector('add');

  // eventsStore.create();

  return (
    <CreateEventComponent
      data={add.data}
      setAddFieldValue={eventsStore.setAddFieldValue}
    />
  );
};

export default CreateEventContainer;
