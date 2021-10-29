import React from 'react';
import {FlatList, Platform} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import homeScreens from 'navigation/home/homeScreens';

import MatchCard from 'views/components/compositions/MatchCard';

import {IMatchesComponentProps} from '../types';
import styles from '../styles';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({
  data,
  onEndReached,
}) => {
  const flatListRef = React.useRef<FlatList<any>>();
  const scrollPosition = React.useRef({step: 0, x: 0});
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = React.useCallback(
    id => {
      pushTo(homeScreens.match.name, {id});
    },
    [pushTo],
  );

  const renderRow = React.useCallback(
    ({item}) => (
      <MatchCard
        id={item.id}
        onPress={() => navigateToMatch(item.id)}
        team1Name={item.team1Name}
        team2Name={item.team2Name}
        team1URI={item.team1URI}
        team2URI={item.team2URI}
        country={item.country}
        league={item.league}
        score={item.score}
        matchState={item.matchState}
        leagueImageURI={item.leagueImageURI}
        startTime={item.startTime}
        minute={item.minute}
        horizontal
      />
    ),
    [navigateToMatch],
  );

  const onScrollBeginDrag = React.useCallback(({nativeEvent}) => {
    scrollPosition.current.x = nativeEvent.contentOffset.x;
  }, []);

  const onScrollEndDrag = React.useCallback(
    ({nativeEvent}) => {
      const step =
        scrollPosition.current.x < nativeEvent.contentOffset.x ? 1 : -1;
      let newStep = scrollPosition.current.step + step;
      newStep = newStep < 0 ? 0 : newStep;
      newStep = newStep >= data.length ? data.length - 1 : newStep;
      scrollPosition.current.step = newStep;
      flatListRef?.current?.scrollToIndex({
        index: scrollPosition.current.step,
      });
    },
    [data.length],
  );

  return (
    <FlatList
      ref={flatListRef}
      onScrollBeginDrag={Platform.OS === 'ios' ? onScrollBeginDrag : undefined}
      onScrollEndDrag={Platform.OS === 'ios' ? onScrollEndDrag : undefined}
      contentContainerStyle={styles.flatList}
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
