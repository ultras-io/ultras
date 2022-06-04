import React from 'react';
import { VStack, HStack, Button, Text } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import FanClubsComponent from 'views/components/compositions/FanClubsHorizontal/FanClubsComponent';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { tabScreens, searchTabScreens } from 'views/navigation/screens';
import buildFanClubsStore from 'stores/fanClubs';
import { IFanClubsContainerProps } from './types';

const TAB_NAME = 'Search';

const fanClubsStore = buildFanClubsStore();
fanClubsStore.getAll();

const FanClubsContainer: React.FC<IFanClubsContainerProps> = ({
  showHeaderButton = true,
  withBounce = true,
}) => {
  const result = fanClubsStore.useSelector('list');

  const { changeTab } = useNavigationWithParams();

  const navigateToFanClubs = React.useCallback(() => {
    changeTab(tabScreens.search.name); // navigate to Search in TabNavigation
    setTimeout(() => {
      changeTab(`${TAB_NAME}:${searchTabScreens.fanClubs.name}`); // navigate to clubs in TopTabNavigation
    });
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
      <FanClubsComponent
        data={result.list.data || []}
        onEndReached={fanClubsStore.getAll}
        withBounce={withBounce}
      />
    </VStack>
  );
};

export default FanClubsContainer;
