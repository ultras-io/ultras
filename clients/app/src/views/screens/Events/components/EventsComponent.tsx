import React from 'react';
import { ListRenderItem } from 'react-native';
import { Skeleton, Box } from 'native-base';
import FlatList from 'views/components/base/FlatList/FlatList';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import EventCard from 'views/components/compositions/EventCard';
import { EventViewModel } from '@ultras/core-api-sdk';
import { IEventsComponentProps } from '../types';
import gStyles from 'styles/styles';

const EventsComponent: React.FC<IEventsComponentProps> = ({
  loading,
  data,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderRow: ListRenderItem<EventViewModel> = React.useCallback(
    ({ item }) => (
      <EventCard
        onPress={() => pushTo(commonScreens.event.name, { data: item })}
        data={item}
      />
    ),
    [pushTo]
  );

  return (
    <Box paddingX={4} paddingTop={4} flex={1}>
      <FlatList
        loading={loading}
        ref={ref}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderRow}
        data={data}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={gStyles.contentContainerStyle}
        ListFooterComponentStyle={gStyles.listFooterComponentStyle}
      />
    </Box>
  );
};

export const EventsLoader: React.FC = () => (
  <Box paddingX={4}>
    {[0, 1, 2, 3, 4, 5].map(k => (
      <Skeleton key={'EventsComponent' + k} h={191} mt={15} rounded={'xl'} />
    ))}
  </Box>
);

export default React.memo<IEventsComponentProps>(EventsComponent);
