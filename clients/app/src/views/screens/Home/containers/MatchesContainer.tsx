import React from 'react';
import { VStack, HStack, Button, Text } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import MatchesComponent from '../components/MatchesComponent';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { tabScreens } from 'views/navigation/screens';
import buildMatchesStore from 'stores/matches';
import { IMatchesContainerProps } from '../types';

const matchesStore = buildMatchesStore();
matchesStore.getAll();

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const result = matchesStore.useSelector('list');

  const { changeTab } = useNavigationWithParams();

  const navigateToMatches = React.useCallback(() => {
    changeTab(tabScreens.matches.name);
  }, [changeTab]);

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
      <MatchesComponent data={result.list.data || []} onEndReached={() => {}} />
    </VStack>
  );
};

export default MatchesContainer;
