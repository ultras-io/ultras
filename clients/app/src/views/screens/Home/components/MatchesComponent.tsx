import React from 'react';
import { FlatList, Platform, ListRenderItem } from 'react-native';
import { VStack, HStack, Button, Text, Skeleton } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens, tabScreens } from 'views/navigation/screens';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import MatchCard from 'views/components/compositions/MatchCard';
import { MatchViewModel } from '@ultras/core-api-sdk';
import { IMatchesComponentProps } from '../types';

const MatchesComponent: React.FC<IMatchesComponentProps> = ({ data, onEndReached }) => {
  const flatListRef: React.MutableRefObject<FlatList<MatchViewModel> | undefined> =
    React.useRef<FlatList<MatchViewModel>>();
  const scrollPosition = React.useRef({ step: 0, x: 0 });
  const { pushTo, changeTab } = useNavigationWithParams();

  const navigateToMatches = React.useCallback(() => {
    changeTab(tabScreens.matches.name);
  }, [changeTab]);

  const renderRow: ListRenderItem<MatchViewModel> = React.useCallback(
    ({ item }) => (
      <MatchCard
        onPress={() => pushTo(commonScreens.match.name, { data: item })}
        data={item}
        inverted
      />
    ),
    [pushTo]
  );

  // step scrolling
  const onScrollBeginDrag = React.useCallback(({ nativeEvent }) => {
    scrollPosition.current.x = nativeEvent.contentOffset.x;
  }, []);

  const onScrollEndDrag = React.useCallback(
    ({ nativeEvent }) => {
      const step = scrollPosition.current.x < nativeEvent.contentOffset.x ? 1 : -1;
      let newStep = scrollPosition.current.step + step;
      newStep = newStep < 0 ? 0 : newStep;
      newStep = newStep >= data.length ? data.length - 1 : newStep;
      scrollPosition.current.step = newStep;
      flatListRef?.current?.scrollToIndex({
        index: scrollPosition.current.step,
      });
    },
    [data.length]
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
        <Text variant={'searchTitle'}>{I18n.t('upcomingMatches')}</Text>
        <Button
          onPress={navigateToMatches}
          rightIcon={
            <Icon name={Icons.ArrowRightRound} color={'iconPrimary'} size={'ic-2xs'} />
          }
          variant={'empty'}
        >
          {I18n.t('viewAll')}
        </Button>
      </HStack>
      <FlatList
        ref={flatListRef}
        onScrollBeginDrag={Platform.OS === 'ios' ? onScrollBeginDrag : undefined}
        onScrollEndDrag={Platform.OS === 'ios' ? onScrollEndDrag : undefined}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderRow}
        data={data}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        horizontal={true}
      />
    </VStack>
  );
};

export const MatchesLoader: React.FC = () => (
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
      {[0, 1].map(k => (
        <Skeleton key={k} w={240} h={144} ml={15} rounded={'xl'} />
      ))}
    </HStack>
  </VStack>
);

export default MatchesComponent;
