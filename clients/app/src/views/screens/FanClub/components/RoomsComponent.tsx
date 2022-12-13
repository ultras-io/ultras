import React from 'react';
import { ListRenderItem } from 'react-native';
import { Skeleton, Box } from 'native-base';
import FlatList from 'views/components/base/FlatList/FlatList';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import RoomCard from './RoomCard';
import { RoomViewModel } from '@ultras/core-api-sdk';
import { IRoomsComponentProps } from '../types';
import gStyles from 'styles/styles';

const RoomsComponent: React.FC<IRoomsComponentProps> = ({
  loading,
  data,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderRow: ListRenderItem<RoomViewModel> = React.useCallback(
    ({ item }) => (
      <RoomCard
        onPress={() => pushTo(commonScreens.room.name, { data: item })}
        data={item}
      />
    ),
    [pushTo]
  );

  return (
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
  );
};

export const RoomsLoader: React.FC = () => (
  <Box paddingX={4}>
    {[0, 1, 2, 3, 4, 5].map(k => (
      <Skeleton key={'RoomsComponent' + k} h={171} mt={15} rounded={'xl'} />
    ))}
  </Box>
);

export default React.memo<IRoomsComponentProps>(RoomsComponent);
