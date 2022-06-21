import React from 'react';
import { Box, Button } from 'native-base';
import type { IState } from 'stores/registration';
import type { ILoginProps } from '../types';

const Login: React.FC<ILoginProps> = ({ useStore, useAuthStore, text, login }) => {
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
