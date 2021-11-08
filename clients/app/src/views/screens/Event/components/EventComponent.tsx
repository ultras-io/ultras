import React from 'react';

// import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import commonScreens from 'navigation/commonScreens';

import EventInfo from 'views/components/compositions/EventInfo';

import {IEventComponentProps} from '../types';

const EventComponent: React.FC<IEventComponentProps> = ({data}) => {
  // const {setOptions, pushTo} = useNavigationWithParams();

  return (
    <EventInfo
      image={data.imageUri}
      date={data.date}
      title={data.title}
      location={data.location}
      goingCount={data.goingCount}
      likeCount={data.likeCount}
      commentsCount={data.commentsCount}
      creator={data.creator}
      supportersClub={data.supportersClub}
      isGoing={data.isGoing}
      isLiked={data.isLiked}
    />
  );
};

export default EventComponent;
