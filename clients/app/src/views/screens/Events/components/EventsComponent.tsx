import React from 'react';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';

import EventCard from 'views/components/compositions/EventCard';

import { IEventsComponentProps } from '../types';
import styles from '../styles';

const EventsComponent: React.FC<IEventsComponentProps> = ({ data, onEndReached }) => {
  const { pushTo } = useNavigationWithParams();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderRow = React.useCallback(
    ({ item }) => (
      <EventCard
        onPress={() => pushTo(commonScreens.event.name, { id: item.id })}
        imageUri={item.imageUri}
        date={item.date}
        title={item.title}
        creator={item.creator}
        supportersClub={item.supportersClub}
        location={item.location}
        commentsCount={item.commentsCount}
        goingCount={item.goingCount}
        isGoing={item.isGoing}
        isLiked={item.isLiked}
      />
    ),
    [pushTo]
  );

  return (
    <FlatList
      ref={ref}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatList}
      style={styles.eventList}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

export default EventsComponent;
