import React from 'react';
import {FlatList} from 'react-native';

import SupportersClubCard from 'views/components/compositions/SupportersClubCard';

import {ISupportersClubsComponentProps} from '../types';

const SupportersClubsComponent: React.FC<ISupportersClubsComponentProps> = ({
  data,
  onPress,
  onEndReached,
}) => {
  const renderColumn = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        // id={item.id}
        onPress={() => onPress(item.id)}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.uri}
        direction="horizontal"
      />
    ),
    [onPress],
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
