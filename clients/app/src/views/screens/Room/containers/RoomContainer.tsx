import React from 'react';
import RoomComponent from '../components/RoomComponent';
import { IRoomContainerProps } from '../types';

const RoomContainer: React.FC<IRoomContainerProps> = ({ data }) => {
  return <RoomComponent data={data} />;
};

export default RoomContainer;
