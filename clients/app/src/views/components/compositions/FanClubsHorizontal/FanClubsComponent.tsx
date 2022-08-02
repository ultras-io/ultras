import React from 'react';
import { Dimensions } from 'react-native';
import { FlatList, VStack, HStack, Button, Text, Skeleton } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import { tabScreens, searchTabScreens } from 'views/navigation/screens';
import FanClubCard from 'views/components/compositions/FanClubCard';
import {
  IFanClubsComponentProps,
  IFanClubsLoaderProps,
} from 'views/containers/FanClubsHorizontal';

const TAB_NAME = 'Search';
const windowWidth = Dimensions.get('window').width;

const FanClubsComponent: React.FC<IFanClubsComponentProps> = ({
  type,
  data,
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
        type={type}
      />
    ),
    [pushTo, type]
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
        {type === 'discover' && (
          <Button
            onPress={preventMultiCalls(() => navigateToFanClubs())}
            rightIcon={
              <Icon name={Icons.ArrowRightRound} color={'iconPrimary'} size={'ic-2xs'} />
            }
            variant={'empty'}
          >
            {I18n.t('common-discover')}
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
        bounces={data.length >= Math.round(windowWidth / 72)}
      />
    </VStack>
  );
};

export const FanClubsLoader: React.FC<IFanClubsLoaderProps> = ({ type }) => {
  return type === 'discover' ? (
    <VStack ml={'.5'}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        ml={'5'}
        mr={'2'}
        marginY={'3'}
      >
        <Skeleton.Text lines={1} w={100} my={2} />
        <Skeleton.Text lines={1} w={100} my={2} mr={2} />
      </HStack>
      <HStack>
        {[0, 1, 2, 3].map(k => (
          <VStack key={'FanClub' + k} h={115} ml={5} alignItems={'center'}>
            <Skeleton w={74} h={74} rounded={'full'} />
            <Skeleton.Text lines={1} w={20} mt={3} />
            <Skeleton.Text lines={1} w={71} mt={1} />
          </VStack>
        ))}
      </HStack>
    </VStack>
  ) : (
    <VStack>
      <Skeleton.Text lines={1} w={100} mt={'4'} mb={'5'} ml={'4'} />
      <HStack ml={'1'}>
        {[0, 1, 2].map(k => (
          <VStack key={'FanClub' + k} alignItems={'center'}>
            <Skeleton key={'MyFanClub' + k} w={74} h={74} ml={'3.5'} rounded={'full'} />
            <Skeleton.Text lines={1} w={16} mt={2} ml={3} />
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default React.memo(FanClubsComponent);
