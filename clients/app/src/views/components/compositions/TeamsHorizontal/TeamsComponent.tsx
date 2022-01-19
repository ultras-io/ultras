import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Avatar from 'views/components/base/Avatar';

import { ITeamsComponentProps } from 'views/containers/TeamsHorizontal';
import styles from './styles';

const TeamsComponent: React.FC<ITeamsComponentProps> = ({
  data,
  withBounce,
  onPress,
}) => {
  const renderColumn = React.useCallback(
    ({ item }) => (
      <Pressable onPress={() => onPress(item.id)} style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={item.logo} isTeam />
        </View>
        <UltrasText color="text" style={styles.name}>
          {item.name}
        </UltrasText>
      </Pressable>
    ),
    [onPress]
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatList}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderColumn}
      data={data}
      horizontal={true}
      bounces={withBounce}
    />
  );
};

export default TeamsComponent;
