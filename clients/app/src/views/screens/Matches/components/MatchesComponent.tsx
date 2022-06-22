import React from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, Skeleton, Box } from 'native-base';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchCard from 'views/components/compositions/MatchCard';
import { NoResults, Loader } from 'views/components/base/ListComponents';
import { MatchViewModel } from '@ultras/core-api-sdk';
import { IMatchesComponentProps } from '../types';
import gStyles from 'styles/styles';

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
      showsVerticalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={data.length ? <Loader /> : null}
      ListEmptyComponent={<NoResults />}
      contentContainerStyle={gStyles.contentContainerStyle}
      ListFooterComponentStyle={gStyles.listFooterComponentStyle}
    />
  );
};

export const MatchesLoader: React.FC = () => (
  <Box paddingX={4}>
    {[0, 1, 2, 3, 4, 5].map(k => (
      <Skeleton key={'MatchesComponent' + k} h={141} mt={15} rounded={'xl'} />
    ))}
  </Box>
);

export default React.memo(MatchesComponent);
