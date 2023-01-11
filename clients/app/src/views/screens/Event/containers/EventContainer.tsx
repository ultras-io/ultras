import React from 'react';
import EventComponent from '../components/EventComponent';
import { IEventContainerProps } from '../types';

const EventContainer: React.FC<IEventContainerProps> = ({ data }) => {
  return <EventComponent data={data} />;
};

export default EventContainer;
