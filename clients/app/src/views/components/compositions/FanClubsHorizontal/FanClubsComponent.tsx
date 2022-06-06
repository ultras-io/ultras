import React from 'react';
import { FlatList } from 'native-base';
import { VStack, HStack, Button, Text, Skeleton } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { tabScreens, searchTabScreens } from 'views/navigation/screens';
import FanClubCard from 'views/components/compositions/FanClubCard';
import { IFanClubsComponentProps } from 'views/containers/FanClubsHorizontal';

const TAB_NAME = 'Search';

const FanClubsComponent: React.FC<IFanClubsComponentProps> = ({
  data,
  withBounce,
  showHeaderButton,
  onEndReached,
}) => {
  const { pushTo, changeTab } = useNavigationWithParams();

  const navigateToFanClubs = React.useCallback(() => {
    changeTab(tabScreens.search.name); // navigate to Search in TabNavigation
    setTimeout(() => {
      changeTab(`${TAB_NAME}:${searchTabScreens.fanClubs.name}`); // navigate to clubs in TopTabNavigation
    });
  }, [changeTab]);

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
    <VStack>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        ml={'5'}
        mr={'2'}
        marginY={'3'}
      >
        <Text variant={'searchTitle'}>{I18n.t('fanClubs')}</Text>
        {showHeaderButton && (
          <Button
            onPress={navigateToFanClubs}
            rightIcon={
              <Icon name={Icons.ArrowRightRound} color={'iconPrimary'} size={'ic-2xs'} />
            }
            variant={'empty'}
          >
            {I18n.t('discover')}
          </Button>
        )}
      </HStack>
      <FlatList
        pl={'3'}
        contentContainerStyle={{ paddingRight: 15 }}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderColumn}
        data={data}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        horizontal={true}
        bounces={withBounce}
      />
    </VStack>
  );
};

export const FanClubsLoader: React.FC = () => (
  <VStack>
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      ml={'5'}
      mr={'2'}
      marginY={'3'}
    >
      <Skeleton.Text lines={1} w={40} my={2} />
      <Skeleton.Text lines={1} w={20} my={2} />
    </HStack>
    <HStack>
      {[0, 1, 2, 3].map(k => (
        <VStack key={'FanClubsComponent' + k} h={115} ml={5} alignItems={'center'}>
          <Skeleton w={74} h={74} rounded={'full'} />
          <Skeleton.Text lines={1} w={20} mt={3} />
          <Skeleton.Text lines={1} w={71} mt={1} />
        </VStack>
      ))}
    </HStack>
  </VStack>
);

export default FanClubsComponent;
