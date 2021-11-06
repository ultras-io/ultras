import React from 'react';
import {FlatList} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import UltrasCard from 'views/components/compositions/UltrasCard';
import EventCard from 'views/components/compositions/EventCard';
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
  const renderEvent = React.useCallback(
    ({item}) => (
      <EventCard
        onPress={() => pushTo(commonScreens.event, {id: item.id})}
        image={item.imageUri}
        date={item.date}
        title={item.title}
        creator={item.creator}
        supportersClub={item.supportersClub}
        location={item.location}
        commentsCount={item.commentsCount}
        goingCount={item.goingCount}
        isGoing={item.isGoing}
        isLiked={item.isLiked}
      />
    ),
    [pushTo],
  );
  const renderClub = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        onPress={() => pushTo(commonScreens.supportersClub, {id: item.id})}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        city={'Yerevan'}
      />
    ),
    [pushTo],
  );
  const renderTeam = React.useCallback(
    ({item}) => (
      <TeamCard
        onPress={() => pushTo(commonScreens.team, {id: item.id})}
        name={item.name}
        supportersClubsCount={item.supportersClubsCount}
        avatarUri={item.logo}
        city={item.city}
        country={item.country}
      />
    ),
    [pushTo],
  );

  const renderAll = React.useCallback(
    ({item}) => {
      switch (item.type) {
        case 'ultras':
          return renderUltas({item});
        case 'events':
          return renderEvent({item});
        case 'clubs':
          return renderClub({item});
        case 'teams':
          return renderTeam({item});
      }
    },
    [renderClub, renderEvent, renderTeam, renderUltas],
  );

  const renderItem = React.useMemo(() => {
    switch (searchItem) {
      case 'all':
        return renderAll;
      case 'ultras':
        return renderUltas;
      case 'events':
        return renderEvent;
      case 'clubs':
        return renderClub;
      case 'teams':
        return renderTeam;
    }
  }, [searchItem, renderAll, renderUltas, renderEvent, renderClub, renderTeam]);

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
