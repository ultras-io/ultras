import React from 'react';
import { FlatList } from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'navigation/screens';

import ProfileCard from 'views/components/compositions/ProfileCard';
import SupportersClubCard from 'views/components/compositions/SupportersClubCard';
import TeamCard from 'views/components/compositions/TeamCard';

import { ISearchItemComponentProps } from '../types';
import styles from '../styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
  data,
  searchItem,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const renderUltras = React.useCallback(
    ({ item }) => (
      <ProfileCard
        onPress={() => pushTo(commonScreens.profile.name, { id: item.id })}
        name={item.name}
        username={item.username}
        avatarUri={item.avatarUri}
      />
    ),
    [pushTo]
  );
  const renderClub = React.useCallback(
    ({ item }) => (
      <SupportersClubCard
        onPress={() => pushTo(commonScreens.supportersClub.name, { id: item.id })}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        city={'Yerevan'}
      />
    ),
    [pushTo]
  );
  const renderTeam = React.useCallback(
    ({ item }) => (
      <TeamCard
        onPress={() => pushTo(commonScreens.team.name, { id: item.id })}
        name={item.name}
        supportersClubsCount={item.supportersClubsCount}
        avatarUri={item.logo}
        city={item.city}
        country={item.country}
      />
    ),
    [pushTo]
  );

  const renderAll = React.useCallback(
    ({ item }) => {
      switch (item.type) {
        case 'ultras':
          return renderUltras({ item });

        case 'clubs':
          return renderClub({ item });
        case 'teams':
          return renderTeam({ item });
      }
    },
    [renderClub, renderTeam, renderUltras]
  );

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      case 'all':
        return renderAll;
      case 'ultras':
        return renderUltras;
      case 'clubs':
        return renderClub;
      case 'teams':
        return renderTeam;
    }
  }, [searchItem, renderAll, renderUltras, renderClub, renderTeam]);

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
