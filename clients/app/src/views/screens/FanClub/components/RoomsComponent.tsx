import React from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, Skeleton, Box } from 'native-base';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import RoomCard from './RoomCard';
import { NoResults, Loader } from 'views/components/base/ListComponents';
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
      ref={ref}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      onEndReached={loading ? undefined : onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={loading ? null : <NoResults />}
      ListFooterComponent={loading ? <Loader /> : null}
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
