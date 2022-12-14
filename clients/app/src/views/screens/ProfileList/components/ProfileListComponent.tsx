import React from 'react';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FlatList from 'views/components/base/FlatList/FlatList';
import ProfileCard from 'views/components/compositions/ProfileCard';
import { IProfileListComponentProps } from '../types';
import styles from '../styles';

const ProfileListComponent: React.FC<IProfileListComponentProps> = ({
  data,
  loading,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const renderRow = React.useCallback(
    ({ item }) => (
      <ProfileCard
        onPress={() => pushTo(commonScreens.profile.name, { id: item.id })}
        name={item.fullname}
        username={item.username}
        avatar={item.avatar}
        appearance="minimal"
      />
    ),
    [pushTo]
  );

  return (
    <FlatList
      loading={loading}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatList}
      showsVerticalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
    />
  );
};

export default ProfileListComponent;
