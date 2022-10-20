import React from 'react';
import { Button } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import EditAvatarContainer from './containers/EditAvatarContainer';
import PersonalInfoContainer from './containers/PersonalInfoContainer';
import buildUserStore from 'stores/user';
import { Loader } from 'views/components/base/ListComponents';
import authenticationStore, { IState } from 'stores/authentication';

const useAuthenticationStore = authenticationStore.initStore();

const EditProfile: React.FC = () => {
  const me = useAuthenticationStore((state: IState) => state.user);

  const userStore = React.useMemo(() => buildUserStore(), []);
  const { single: storeSingle } = userStore.useSelector('single');

  React.useEffect(() => {
    storeSingle.getSingle(me.id!);
  }, [me?.id, storeSingle]);

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
        <Loader />
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
