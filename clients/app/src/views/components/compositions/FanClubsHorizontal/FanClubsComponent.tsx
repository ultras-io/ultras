import React from 'react';
import { FlatList } from 'react-native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FanClubCard from 'views/components/compositions/FanClubCard';
import { IFanClubsComponentProps } from 'views/containers/FanClubsHorizontal';
import styles from './styles';

const FanClubsComponent: React.FC<IFanClubsComponentProps> = ({
  data,
  avatarSize,
  withBounce,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const renderColumn = React.useCallback(
    ({ item }) => (
      <FanClubCard
        onPress={() => pushTo(commonScreens.fanClub.name, { data: item })}
        data={item}
        avatarSize={avatarSize}
        direction="horizontal"
      />
    ),
    [pushTo, avatarSize]
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

export default FanClubsComponent;
