import React from 'react';
import { Box, Button, Text, HStack } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import type { IState } from 'stores/registration';
import type { IUsernameProps } from '../types';

const Username: React.FC<IUsernameProps> = ({ useStore }) => {
  const nextStep = useStore((state: IState) => state.nextStep);
  const status = useStore((state: IState) => state.status);
  const statusNext = useStore((state: IState) => state.statusNext);
  const username = useStore((state: IState) => state.user.username);
  const isUserNameValid = useStore((state: IState) => state.user.isUserNameValid);
  const checkUsername = useStore((state: IState) => state.checkUsername);
  const register = useStore((state: IState) => state.register);

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
