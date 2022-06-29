import React from 'react';
import { Box, Button, Text, HStack } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import registrationStore, { IState } from 'stores/registration';
import type { IUsernameProps } from '../types';

const Username: React.FC<IUsernameProps> = ({ useStore }) => {
  const statusSelector = React.useCallback(() => (state: IState) => state.status, []);
  const statusNextSelector = React.useCallback(
    () => (state: IState) => state.statusNext,
    []
  );
  const usernameSelector = React.useCallback(
    () => (state: IState) => state.user.username,
    []
  );
  const isUserNameValidSelector = React.useCallback(
    () => (state: IState) => state.user.isUserNameValid,
    []
  );
  const status = useStore(statusSelector());
  const statusNext = useStore(statusNextSelector());
  const username = useStore(usernameSelector());
  const isUserNameValid = useStore(isUserNameValidSelector());
  const nextStep = useStore(registrationStore.nextStepSelector());
  const checkUsername = useStore(registrationStore.checkUsernameSelector());
  const register = useStore(registrationStore.registerSelector());

  React.useLayoutEffect(() => {
    if (statusNext === 'success') {
      nextStep();
    } else if (statusNext === 'error') {
      // @TODO handle error
    }
  }, [statusNext, nextStep]);

  return (
    <Box w={'80%'} alignSelf="flex-end" mr={5} my={2}>
      <Input
        flex={1}
        onChange={text => checkUsername(text)}
        variant="email"
        placeholder={I18n.t('common-enter') + ' ' + I18n.t('common-username')}
        returnKeyType="done"
        mb={'2'}
      />

      {username !== '' && status === 'success' && !isUserNameValid && (
        <HStack
          space={'1'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          mr={'3'}
          mb={'1'}
        >
          <Icon name={Icons.Warning} color={'textAction'} size={'ic-2xs'} />
          <Text variant={'smallText'} textAlign={'right'}>
            {I18n.t('joinUs-usernameTaken', { username })}
          </Text>
        </HStack>
      )}

      <Button
        onPress={() => register()}
        variant={'primary'}
        mt={'2'}
        disabled={!(status === 'success' && isUserNameValid)}
        isLoading={status === 'loading' || statusNext === 'loading'}
      >
        {I18n.t('common-confirm')}
      </Button>
    </Box>
  );
};

export default React.memo<IUsernameProps>(Username);
