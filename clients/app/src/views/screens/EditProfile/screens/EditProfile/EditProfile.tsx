import React from 'react';
import { Button } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import EditAvatarContainer from './containers/EditAvatarContainer';
import PersonalInfoContainer from './containers/PersonalInfoContainer';
import EditProfileLoader from './EditProfileLoader';
import { usersStore } from '../../store';
import authenticationStore, { IState } from 'stores/authentication';

const useAuthenticationStore = authenticationStore.initStore();

const EditProfile: React.FC = () => {
  const isFocused = useIsFocused();
  const me = useAuthenticationStore((state: IState) => state.user);

  const { single: storeSingle } = usersStore.useSelector('single');

  React.useEffect(() => {
    if (isFocused) {
      storeSingle.getSingle(me.id!);
    }
  }, [me?.id, storeSingle, isFocused]);

  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  return (
    <>
      <Button
        onPress={goBack}
        variant={'empty'}
        alignSelf="flex-start"
        _text={{ color: colors.textAction }}
        mt={'5'}
        mb={'2.5'}
        px={'2.5'}
      >
        {I18n.t('common-close')}
      </Button>

      {storeSingle.status === 'loading' ? (
        <EditProfileLoader />
      ) : (
        <>
          <EditAvatarContainer data={storeSingle.data!} />
          <PersonalInfoContainer data={storeSingle.data!} />
        </>
      )}
    </>
  );
};

export default EditProfile;
