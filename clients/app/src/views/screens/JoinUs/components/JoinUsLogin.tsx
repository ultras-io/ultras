import React from 'react';
import { Box, Button } from 'native-base';
import I18n from 'i18n/i18n';
import type { IState } from 'stores/registration';
import type { IJoinUsButtonProps } from '../types';

const JoinUsButton: React.FC<IJoinUsButtonProps> = ({ useStore, useAuthStore }) => {
  const status = useStore((state: IState) => state.status);
  const token = useStore((state: IState) => state.token);
  const userResponse = useStore((state: IState) => state.userResponse);
  const loginRegistration = useStore((state: IState) => state.login);
  const enterMe = useAuthStore((state: IState) => state.login);

  React.useLayoutEffect(() => {
    if (status === 'success') {
      enterMe(token, userResponse);
    }
  }, [status, enterMe, token, userResponse]);

  return (
    <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
      <Button
        onPress={loginRegistration}
        variant={'primary'}
        isLoading={status === 'loading'}
      >
        {I18n.t('joinUsLetMeIn')}
      </Button>
    </Box>
  );
};

export default React.memo<IJoinUsButtonProps>(JoinUsButton);
