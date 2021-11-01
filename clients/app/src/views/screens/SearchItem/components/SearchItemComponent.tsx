import React from 'react';
import {FlatList} from 'react-native';

import TeamCard from 'views/components/compositions/TeamCard';
import SupportersClubCard from 'views/components/compositions/SupportersClubCard';

import {ISearchItemComponentProps} from '../types';
import styles from '../styles';

const SearchItemComponent: React.FC<ISearchItemComponentProps> = ({
  data,
  searchItem,
  onEndReached,
}) => {
  const renderClub = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        // id={item.id}
        // onPress={() => navigateToMatch(item.id)}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        city={'Yerevan'}
      />
    ),
    [],
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

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      case 'clubs':
        return renderClub;
      case 'teams':
        return renderTeam;
    }
  }, [searchItem, renderClub, renderTeam]);

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
    />
  );
};

export default SearchItemComponent;
