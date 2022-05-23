import React from 'react';
import { View } from 'react-native';
import MatchesComponent from '../components/MatchesComponent';
import buildMatchesStore from 'stores/matches';
import { IMatchesContainerProps } from '../types';
import styles from '../styles';

const matchesStore = buildMatchesStore();
matchesStore.getAll();

const MatchesContainer: React.FC<IMatchesContainerProps> = ({ route }) => {
  const teamId = route?.params?.teamId ?? null;

  React.useEffect(() => {
    if (teamId) {
      matchesStore.updateFilter({ teamId });
      matchesStore.getAll();
    }
  }, [teamId]);

  const result = matchesStore.useSelector('list');

  return (
    <View style={styles.container}>
      <MatchesComponent
        data={result.list.data || []}
        onEndReached={matchesStore.getAll}
      />
    </View>
  );
};

export default MatchesContainer;
