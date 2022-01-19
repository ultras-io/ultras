import React from 'react';

import EventComponent from '../components/EventComponent';
import { generateEvent } from 'utils/helpers/dummy';

import { IEventContainerProps } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EventContainer: React.FC<IEventContainerProps> = ({ id }) => {
  // get event's data by id

  const data = generateEvent();

  return <EventComponent data={data} />;
};

export default EventContainer;
