import React from 'react';
import { Box, Button } from 'native-base';
import registrationStore, { IState } from 'stores/registration';
import authenticationStore from 'stores/authentication';
import type { ILoginProps } from '../types';

const Login: React.FC<ILoginProps> = ({ useStore, useAuthStore, text, login }) => {
  const statusSelector = React.useCallback(() => (state: IState) => state.status, []);
  const tokenSelector = React.useCallback(() => (state: IState) => state.token, []);
  const userResponseSelector = React.useCallback(
    () => (state: IState) => state.userResponse,
    []
  );
  const status = useStore(statusSelector());
  const token = useStore(tokenSelector());
  const userResponse = useStore(userResponseSelector());
  const loginRegistration = useStore(registrationStore.loginSelector());
  const enterMe = useAuthStore(authenticationStore.loginSelector());

  React.useLayoutEffect(() => {
    if (status === 'success') {
      enterMe(token, userResponse);
    }
    // @TODO handle error
  }, [status, enterMe, token, userResponse]);

  return (
    <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
      <Button
        onPress={login ? loginRegistration : () => enterMe(token, userResponse)}
        variant={'primary'}
        isLoading={status === 'loading'}
      >
        {text}
      </Button>
    </Box>
  );
};

export default React.memo<ILoginProps>(Login);
