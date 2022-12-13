import React from 'react';
import { ListRenderItem } from 'react-native';
import { Skeleton, Box } from 'native-base';
import FlatList from 'views/components/base/FlatList/FlatList';
import { useScrollToTop } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchCard from 'views/components/compositions/MatchCard';
import { MatchViewModel } from '@ultras/core-api-sdk';
import { IMatchesComponentProps } from '../types';
import gStyles from 'styles/styles';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({
  loading,
  data,
  onEndReached,
}) => {
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
    <Box paddingX={4} paddingTop={4} flex={1}>
      <FlatList
        loading={loading}
        ref={ref}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderRow}
        data={data}
        onEndReached={onEndReached}
        contentContainerStyle={gStyles.contentContainerStyle}
        ListFooterComponentStyle={gStyles.listFooterComponentStyle}
      />
    </Box>
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
