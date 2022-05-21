import React from 'react';
import { FlatList } from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';

// import ProfileCard from 'views/components/compositions/ProfileCard';
import FanClubCard from 'views/components/compositions/FanClubCard';
import TeamCard from 'views/components/compositions/TeamCard';

import { ISearchItemComponentProps } from '../types';
import styles from '../styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
  data,
  searchItem,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  // const renderUltras = React.useCallback(
  //   ({ item }) => (
  //     <ProfileCard
  //       onPress={() => pushTo(commonScreens.profile.name, { id: item.id })}
  //       name={item.name}
  //       username={item.username}
  //       avatarUri={item.avatarUri}
  //     />
  //   ),
  //   [pushTo]
  // );

  const renderFanClub = React.useCallback(
    ({ item }) => (
      <FanClubCard
        onPress={() => pushTo(commonScreens.fanClub.name, { data: item })}
        data={item}
      />
    ),
    [pushTo]
  );

  const renderTeam = React.useCallback(
    ({ item }) => (
      <TeamCard
        onPress={() => pushTo(commonScreens.team.name, { id: item.id })}
        name={item.name}
        // FanClubsCount={100}
        avatarUri={item.logo}
        city={item.city.name}
        country={item.country.name}
      />
    ),
    [pushTo]
  );

  // const renderAll = React.useCallback(
  //   ({ item }) => {
  //     switch (item.type) {
  //       case 'ultras':
  //         return renderUltras({ item });

  //       case 'clubs':
  //         return renderFanClub({ item });
  //       case 'teams':
  //         return renderTeam({ item });
  //     }
  //   },
  //   [renderFanClub, renderTeam, renderUltras]
  // );

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      // case 'all':
      //   return renderAll;
      // case 'ultras':
      //   return renderUltras;
      case 'fanClubs':
        return renderFanClub;
      case 'teams':
        return renderTeam;
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
