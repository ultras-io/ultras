import React from 'react';
import { FlatList } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import FanClubCard from 'views/components/compositions/FanClubCard';
import { IFanClubsComponentProps } from 'views/containers/FanClubsHorizontal';

const FanClubsComponent: React.FC<IFanClubsComponentProps> = ({
  data,
  withBounce,
  onEndReached,
}) => {
  const { pushTo } = useNavigationWithParams();

  const renderColumn = React.useCallback(
    ({ item }) => (
      <FanClubCard
        onPress={() => pushTo(commonScreens.fanClub.name, { data: item })}
        data={item}
        direction="horizontal"
      />
    ),
    [pushTo]
  );

  return (
    <FlatList
      paddingX={'3'}
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
