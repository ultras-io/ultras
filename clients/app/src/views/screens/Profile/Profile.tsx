import React from 'react';
import { HStack, IconButton, useDisclose } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import authenticationStore, { IState } from 'stores/authentication';
import buildUserStore from 'stores/user';
import Container from 'views/components/base/Container';
import MenuActionSheet from './components/MenuActionSheet';
import { IProfileProps } from './types';

const useAuthenticationStore = authenticationStore.initStore();

const ProfileContainer = React.lazy(() => import('./containers/ProfileContainer'));
const TeamsContainer = React.lazy(() => import('./containers/TeamsContainer'));
const FanClubsContainer = React.lazy(
  () => import('views/containers/FanClubsHorizontal/FanClubsContainer')
);

const Profile: React.FC<IProfileProps> = ({ route }) => {
  const { data } = route.params;
  const userStoreRef = React.useRef(buildUserStore());
  const { setOptions } = useNavigationWithParams();
  const { isOpen, onOpen, onClose } = useDisclose();
  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const me = useAuthenticationStore(userSelector());

  React.useLayoutEffect(() => {
    if (!data) {
      setOptions({
        headerRight: () => (
          <HStack space={'1.5'}>
            <IconButton
              onPress={() => {}}
              icon={<Icon name={Icons.Warning} color={'iconPrimary'} size={'ic-md'} />}
            />
            <IconButton
              onPress={onOpen}
              icon={<Icon name={Icons.Menu} color={'iconPrimary'} size={'ic-md'} />}
            />
          </HStack>
        ),
      });
    } else {
      setOptions({ headerTitle: '' });
    }
  }, [setOptions, onOpen, data]);

  React.useEffect(() => {
    if (data?.id) userStoreRef.current.getSingle(data.id);
  }, [data?.id]);

  const result = userStoreRef.current.useSelector('single');

  const [isMe, userData] = React.useMemo(() => {
    if (result.single.data && result.single.status === 'success')
      return [false, result.single.data];
    if (data) return [false, data];
    return [true, me];
  }, [data, me, result.single.data, result.single.status]);

  return (
    <Container withSuspense withBg>
      <ProfileContainer data={userData} />
      <TeamsContainer isMe={isMe} data={userData} />
      <FanClubsContainer type={isMe ? 'my' : 'otherUser'} data={userData.fanClubs} />
      <MenuActionSheet
        useStore={useAuthenticationStore}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
};

export default Profile;
