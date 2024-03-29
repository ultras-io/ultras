import React from 'react';
import { Box, Skeleton } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FlatList from 'views/components/base/FlatList/FlatList';
import TeamCard from 'views/components/compositions/TeamCard';
import FanClubCard from 'views/components/compositions/FanClubCard';
import { ISearchItemComponentProps } from '../types';
import gStyles from 'styles/styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
  loading,
  data,
  searchItem,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const renderTeam = React.useCallback(
    ({ item }) => (
      <TeamCard
        onPress={() => pushTo(commonScreens.team.name, { data: item })}
        data={item}
      />
    ),
    [pushTo]
  );

  const renderFanClub = React.useCallback(
    ({ item }) => (
      <FanClubCard
        onPress={() => pushTo(commonScreens.fanClub.name, { data: item })}
        data={item}
      />
    ),
    [pushTo]
  );

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      case 'teams':
        return renderTeam;
      case 'fanClubs':
        return renderFanClub;
    }
  }, [searchItem, renderFanClub, renderTeam]);

  return (
    <Box paddingX={4} paddingTop={4} flex={1}>
      <FlatList
        loading={loading}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        data={data}
        onEndReached={onEndReached}
        keyboardDismissMode={'on-drag'}
        contentContainerStyle={gStyles.contentContainerStyle}
        ListFooterComponentStyle={gStyles.listFooterComponentStyle}
      />
    </Box>
  );
};

export const SearchItemLoader: React.FC = () => (
  <Box paddingX={4}>
    {[0, 1, 2, 3, 4, 5].map(k => (
      <Skeleton key={'SearchItemComponent' + k} h={90} mt={2.5} rounded={'xl'} />
    ))}
  </Box>
);

export default React.memo<ISearchItemComponentProps>(SearchItemComponent);
