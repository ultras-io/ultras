import React from 'react';
import { HStack, IconButton, useDisclose } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import initAuthStore from 'stores/authentication';
import Container from 'views/components/base/Container';
import ActionSheet from './components/MenuActionSheet';
import { IProfileProps } from './types';

const useAuthenticationStore = initAuthStore();

const ProfileContainer = React.lazy(() => import('./containers/ProfileContainer'));
const TeamsContainer = React.lazy(() => import('./containers/TeamsContainer'));
const FanClubsContainer = React.lazy(
  () => import('views/containers/FanClubsHorizontal/FanClubsContainer')
);

const Profile: React.FC<IProfileProps> = ({ route }) => {
  const { id } = route.params;
  const { setOptions } = useNavigationWithParams();
  const { isOpen, onOpen, onClose } = useDisclose();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HStack space={'1.5'}>
          <IconButton
            onPress={() => {}}
            icon={<Icon name={Icons.Add} color={'iconPrimary'} size={'ic-md'} />}
          />
          <IconButton
            onPress={onOpen}
            icon={<Icon name={Icons.Menu} color={'iconPrimary'} size={'ic-md'} />}
          />
        </HStack>
      ),
    });
  }, [setOptions, onOpen]);

  return (
    <Container withSuspense>
      <ProfileContainer useStore={useAuthenticationStore} id={id} />
      <TeamsContainer useStore={useAuthenticationStore} id={id} />
      <FanClubsContainer type={'my'} />
      <ActionSheet useStore={useAuthenticationStore} isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Profile;
