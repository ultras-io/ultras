import React from 'react';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';

import MatchCard from 'views/components/compositions/MatchCard';

import { IMatchesComponentProps } from '../types';
import styles from '../styles';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({ data, onEndReached }) => {
  const { pushTo } = useNavigationWithParams();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderRow = React.useCallback(
    ({ item }) => (
      <MatchCard
        id={item.id}
        onPress={() => pushTo(commonScreens.match.name, { id: item.id })}
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
    [pushTo]
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
      // stickyHeaderIndices={[0]}
    />
  );
};

export default MatchesComponent;
