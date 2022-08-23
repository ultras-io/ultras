import React from 'react';
import buildEventsStore from 'stores/events/events';
import CreateEventComponent from '../components/CreateEventComponent';

const eventsStore = buildEventsStore();

const CreateEventContainer: React.FC = () => {
  // eventsStore.setFieldValue('title', 'a');

  const { add } = eventsStore.useSelector('add');

  // eventsStore.create();

  return (
    <CreateEventComponent data={add.data} setFieldValue={eventsStore.setFieldValue} />
  );
};

export default CreateEventContainer;
