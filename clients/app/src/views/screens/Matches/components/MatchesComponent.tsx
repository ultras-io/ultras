import React from 'react';
import {FlatList, Pressable} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import matchesScreens from 'navigation/matches/matchesScreens';

import MatchCard from 'views/components/compositions/MatchCard';

import {IMatchesComponentProps} from '../types';
import styles from '../styles';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({
  data,
  onEndReached,
}) => {
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = React.useCallback(
    id => {
      pushTo(matchesScreens.match.name, {id});
    },
    [pushTo],
  );

  const ref = React.useRef(null);
  useScrollToTop(ref);

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
      />
    ),
    [navigateToMatch],
  );

  return (
    <FlatList
      ref={ref}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatList}
      showsVerticalScrollIndicator={false}
      style={styles.matchList}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

export default MatchesComponent;
