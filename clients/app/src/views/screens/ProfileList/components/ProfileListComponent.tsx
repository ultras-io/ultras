import React from 'react';
import { FlatList } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import ProfileCard from 'views/components/compositions/ProfileCard';
import { IProfileListComponentProps } from '../types';
import styles from '../styles';
import { NoResults } from 'views/components/base/ListComponents';
import Loader from 'views/screens/Loader';

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
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatList}
      showsVerticalScrollIndicator={false}
      renderItem={renderRow}
      data={data}
      onEndReached={onEndReached}
      // onEndReachedThreshold={0.7}
      ListEmptyComponent={loading ? null : <NoResults />}
      ListFooterComponent={loading ? <Loader /> : null}
    />
  );
};

export default ProfileListComponent;
