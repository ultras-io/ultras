import React from 'react';
import {FlatList} from 'react-native';

import SupportersClubCard from 'views/components/compositions/SupportersClubCard';

import {ISupportersClubsComponentProps} from 'views/containers/SupportersClubsHorizontal';
import styles from './styles';

const SupportersClubsComponent: React.FC<ISupportersClubsComponentProps> = ({
  data,
  avatarSize,
  withBounce,
  onPress,
  onEndReached,
}) => {
  const renderColumn = React.useCallback(
    ({item}) => (
      <SupportersClubCard
        onPress={() => onPress(item.id)}
        name={item.name}
        ultrasCount={item.ultrasCount}
        avatarUri={item.avatarUri}
        avatarSize={avatarSize}
        direction="horizontal"
      />
    ),
    [onPress, avatarSize],
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatList}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderColumn}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      horizontal={true}
      bounces={withBounce}
    />
  );
};

export default SupportersClubsComponent;
