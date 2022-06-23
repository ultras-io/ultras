import React from 'react';
import { Box, Button } from 'native-base';
import type { IState } from 'stores/registration';
import type { IState as IAuthState } from 'stores/authentication';
import type { ILoginProps } from '../types';

const Login: React.FC<ILoginProps> = ({ useStore, useAuthStore, text, login }) => {
  const statusSelector = React.useCallback(() => (state: IState) => state.status, []);
  const tokenSelector = React.useCallback(() => (state: IState) => state.token, []);
  const userResponseSelector = React.useCallback(
    () => (state: IState) => state.userResponse,
    []
  );
  const loginRegistrationSelector = React.useCallback(
    () => (state: IState) => state.login,
    []
  );
  const enterMeSelector = React.useCallback(() => (state: IAuthState) => state.login, []);

  const status = useStore(statusSelector());
  const token = useStore(tokenSelector());
  const userResponse = useStore(userResponseSelector());
  const loginRegistration = useStore(loginRegistrationSelector());
  const enterMe = useAuthStore(enterMeSelector());

  React.useLayoutEffect(() => {
    if (status === 'success') {
      enterMe(token, userResponse);
    }
    // @TODO handle error
  }, [status, enterMe, token, userResponse]);

  return (
    <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
      <Button
        onPress={login ? () => loginRegistration() : () => enterMe(token, userResponse)}
        variant={'primary'}
        isLoading={status === 'loading'}
      >
        {text}
      </Button>
    </Box>
  );
};

export default React.memo<ILoginProps>(Login);
