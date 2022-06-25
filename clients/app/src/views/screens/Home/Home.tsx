import React from 'react';
import { HStack, IconButton, useDisclose } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'views/navigation/screens/commonScreens';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import AddActionSheet from './components/AddActionSheet';
import Container from 'views/components/base/Container';

const FanClubsContainer = React.lazy(
  () => import('views/containers/FanClubsHorizontal/FanClubsContainer')
);
const MatchesContainer = React.lazy(
  () => import('views/screens/Home/containers/MatchesContainer')
);

const Home: React.FC = () => {
  const { setOptions, pushTo } = useNavigationWithParams();
  const { isOpen, onOpen, onClose } = useDisclose();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HStack space={'1.5'}>
          <IconButton
            onPress={onOpen}
            icon={<Icon name={Icons.Add} color={'iconPrimary'} size={'ic-md'} />}
          />
          <IconButton
            onPress={preventMultiCalls(() => pushTo(commonScreens.notifications.name))}
            icon={
              <Icon name={Icons.Notifications} color={'iconPrimary'} size={'ic-md'} />
            }
          />
        </HStack>
      ),
    });
  }, [setOptions, onOpen, pushTo]);

  return (
    <Container withSuspense withBg bgSize={'lg'}>
      <FanClubsContainer />
      <MatchesContainer />
      <AddActionSheet isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Home;
