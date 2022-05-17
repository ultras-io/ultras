import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchCard from 'views/components/compositions/MatchCard';
import { MatchViewModel } from '@ultras/core-api-sdk';
import { IMatchesComponentProps } from '../types';
import styles from '../styles';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({ data, onEndReached }) => {
  const { pushTo } = useNavigationWithParams();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const renderRow: ListRenderItem<MatchViewModel> = React.useCallback(
    ({ item }) => (
      <MatchCard
        onPress={() => pushTo(commonScreens.match.name, { data: item })}
        data={item}
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
