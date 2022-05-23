import React from 'react';
import { FlatList } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import TeamCard from 'views/components/compositions/TeamCard';
import FanClubCard from 'views/components/compositions/FanClubCard';
// import ProfileCard from 'views/components/compositions/ProfileCard';
import { ISearchItemComponentProps } from '../types';
import styles from '../styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
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
    <FlatList
      style={styles.flatContainer}
      contentContainerStyle={styles.flatList}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      keyboardDismissMode={'on-drag'}
    />
  );
};

export default SearchItemComponent;
