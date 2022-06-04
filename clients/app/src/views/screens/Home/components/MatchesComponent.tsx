import React from 'react';
import { FlatList, Platform, ListRenderItem } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchCard from 'views/components/compositions/MatchCard';
import { MatchViewModel } from '@ultras/core-api-sdk';
import { IMatchesComponentProps } from '../types';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({ data, onEndReached }) => {
  const flatListRef: React.MutableRefObject<FlatList<MatchViewModel> | undefined> =
    React.useRef<FlatList<MatchViewModel>>();
  const scrollPosition = React.useRef({ step: 0, x: 0 });
  const { pushTo } = useNavigationWithParams();

  const renderRow: ListRenderItem<MatchViewModel> = React.useCallback(
    ({ item }) => (
      <MatchCard
        onPress={() => pushTo(commonScreens.match.name, { data: item })}
        data={item}
        horizontal
      />
    ),
    [pushTo]
  );

  // step scrolling
  const onScrollBeginDrag = React.useCallback(({ nativeEvent }) => {
    scrollPosition.current.x = nativeEvent.contentOffset.x;
  }, []);

  const onScrollEndDrag = React.useCallback(
    ({ nativeEvent }) => {
      const step = scrollPosition.current.x < nativeEvent.contentOffset.x ? 1 : -1;
      let newStep = scrollPosition.current.step + step;
      newStep = newStep < 0 ? 0 : newStep;
      newStep = newStep >= data.length ? data.length - 1 : newStep;
      scrollPosition.current.step = newStep;
      flatListRef?.current?.scrollToIndex({
        index: scrollPosition.current.step,
      });
    },
    [data.length]
  );

  return (
    <FlatList
      ref={flatListRef}
      onScrollBeginDrag={Platform.OS === 'ios' ? onScrollBeginDrag : undefined}
      onScrollEndDrag={Platform.OS === 'ios' ? onScrollEndDrag : undefined}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      horizontal={true}
    />
  );
};

export default MatchesComponent;
