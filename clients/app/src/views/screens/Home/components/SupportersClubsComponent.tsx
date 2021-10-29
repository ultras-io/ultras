import React from 'react';
import {FlatList} from 'react-native';

import SupportersClubCard from 'views/components/compositions/SupportersClubCard';

// import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import matchesScreens from 'navigation/matches/matchesScreens';

// import MatchCard from 'views/components/compositions/MatchCard';

import {ISupportersClubsComponentProps} from '../types';
// import styles from '../styles';

const SupportersClubsComponent: React.FC<ISupportersClubsComponentProps> = ({
  data,
  onEndReached,
}) => {
  // const {pushTo} = useNavigationWithParams();

  // const navigateToMatch = React.useCallback(
  //   id => {
  //     pushTo(matchesScreens.match.name, {id});
  //   },
  //   [pushTo],
  // );

  const renderColumn = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        // id={item.id}
        // onPress={() => navigateToMatch(item.id)}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        direction="horizontal"
      />
    ),
    [],
  );

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderColumn}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      horizontal={true}
    />
  );
};

export default SupportersClubsComponent;
