import React from 'react';
import {FlatList} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import screens from 'navigation/search/searchScreens';

import UltrasCard from 'views/components/compositions/UltrasCard';
import SupportersClubCard from 'views/components/compositions/SupportersClubCard';
import TeamCard from 'views/components/compositions/TeamCard';

import {ISearchItemComponentProps} from '../types';
import styles from '../styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
  data,
  searchItem,
  onEndReached,
}) => {
  const {pushTo} = useNavigationWithParams();
  const navigateToSupportersClub = React.useCallback(
    (id: string) => {
      pushTo(screens.supportersClub.name);
    },
    [pushTo],
  );

  const renderUltas = React.useCallback(
    ({item}) => (
      <UltrasCard
        name={item.name}
        userName={item.userName}
        avatarUri={item.avatar}
      />
    ),
    [],
  );
  const renderClub = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        // id={item.id}
        onPress={() => navigateToSupportersClub(item.id)}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        city={'Yerevan'}
      />
    ),
    [navigateToSupportersClub],
  );
  const renderTeam = React.useCallback(
    ({item}) => (
      <TeamCard
        name={item.name}
        supportersClubsCount={item.supportersClubsCount}
        avatarUri={item.logo}
        city={item.city}
        country={item.country}
      />
    ),
    [],
  );

  const renderAll = React.useCallback(
    ({item}) => {
      switch (item.type) {
        case 'ultras':
          return renderUltas({item});
        case 'clubs':
          return renderClub({item});
        case 'teams':
          return renderTeam({item});
      }
    },
    [renderClub, renderTeam, renderUltas],
  );

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      case 'all':
        return renderAll;
      case 'ultras':
        return renderUltas;
      case 'clubs':
        return renderClub;
      case 'teams':
        return renderTeam;
    }
  }, [searchItem, renderAll, renderUltas, renderClub, renderTeam]);

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
