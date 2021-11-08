import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import EventContainer from './containers/EventContainer';

import {IEventProps} from './types';

const Event: React.FC<IEventProps> = ({route}) => {
  const {id} = route.params;

  return (
    <WithSafeArea>
      <EventContainer id={id} />
    </WithSafeArea>
  );
};

export default Event;
