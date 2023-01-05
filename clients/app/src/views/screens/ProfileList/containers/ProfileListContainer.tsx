import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import ProfileListComponent from '../components/ProfileListComponent';
import { IProfileListContainerProps } from '../types';
import styles from '../styles';

const ProfileListContainer: React.FC<IProfileListContainerProps> = ({
  title,
  data,
  loading,
  onEndReached,
}) => {
  const { setOptions } = useNavigationWithParams();

  React.useEffect(() => {
    setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: () => (
        <Text variant="sectionTitle" color={'textHeader'} numberOfLines={1}>
          {title}
        </Text>
      ),
    });
  }, [setOptions, title]);

  return (
    <View style={styles.container}>
      <ProfileListComponent data={data} loading={loading} onEndReached={onEndReached} />
    </View>
  );
};

export default ProfileListContainer;
