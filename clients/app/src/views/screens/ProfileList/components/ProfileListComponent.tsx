import React from 'react';
import { FlatList } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import ProfileCard from 'views/components/compositions/ProfileCard';
import { IProfileListComponentProps } from '../types';
import styles from '../styles';

const ProfileListComponent: React.FC<IProfileListComponentProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();

  const renderRow = React.useCallback(
    ({ item }) => (
      <ProfileCard
        onPress={() => pushTo(commonScreens.profile, { id: item.id })}
        name={item.name}
        username={item.username}
        avatarUri={item.avatarUri}
        appearence="minimal"
      />
    ),
    [pushTo]
  );

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatList}
      showsVerticalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      // onEndReached={onEndReached}
      // onEndReachedThreshold={0.7}
    />
  );
};

export default ProfileListComponent;
