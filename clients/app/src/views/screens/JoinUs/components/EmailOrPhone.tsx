import React from 'react';
import {
  Box,
  Button,
  Text,
  Pressable,
  HStack,
  InputGroup,
  InputLeftAddon,
} from 'native-base';
import I18n from 'i18n/i18n';
import { validateEmail, validatePhoneNumber } from 'utils/helpers/validation';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import rootScreens from 'views/navigation/screens/rootScreens';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import type { IState } from 'stores/registration';
import type { IEmailOrPhoneProps } from '../types';

const EmailOrPhone: React.FC<IEmailOrPhoneProps> = ({ useStore, onModalOpen }) => {
  const isEmailSelector = React.useCallback(
    () => (state: IState) => state.user.joinVia.isEmail,
    []
  );
  const keySelector = React.useCallback(
    () => (state: IState) => state.user.joinVia.key,
    []
  );
  const countryCodeSelector = React.useCallback(
    () => (state: IState) => state.user.country.name,
    []
  );
  const statusSelector = React.useCallback(() => (state: IState) => state.status, []);
  const confirmIdentitySelector = React.useCallback(
    () => (state: IState) => state.confirmIdentity,
    []
  );
  const nextStepSelector = React.useCallback(() => (state: IState) => state.nextStep, []);

  const isEmail = useStore(isEmailSelector());
  const key = useStore(keySelector());
  const countryCode = useStore(countryCodeSelector());
  const status = useStore(statusSelector());
  const confirmIdentity = useStore(confirmIdentitySelector());
  const nextStep = useStore(nextStepSelector());

  const [isValid, setIsValid] = React.useState(true);
  const [value, setValue] = React.useState('');

  const { colors } = useTheme();
  const { openModal } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    if (status === 'success') {
      nextStep();
    }
  }, [status, nextStep]);

  const onChange = React.useCallback(
    text => {
      setValue(text);
      if (isEmail) {
        setIsValid(validateEmail(text));
      } else {
        setIsValid(validatePhoneNumber(text));
      }
    },
    [isEmail]
  );

  const input = (
    <Input
      flex={1}
      onChange={onChange}
      variant="email"
      debounce={false}
      placeholder={I18n.t('common-enter') + ' ' + I18n.t(key)}
      keyboardType={isEmail ? 'email-address' : 'number-pad'}
      returnKeyType="done"
      onlyNumbers={!isEmail}
    />
  );

  return (
    <Box w={'80%'} alignSelf="flex-end" mr={5} my={2}>
      {isEmail ? (
        input
      ) : (
        <InputGroup>
          <Pressable onPress={onModalOpen}>
            <InputLeftAddon
              children={countryCode}
              flex={1}
              bg={colors.backgroundInputInvert}
              borderColor={colors.backgroundInputInvert}
              borderRightColor={colors.backgroundDividerTransparent}
              borderRightWidth={1}
              _text={{ color: colors.textPrimaryInvert, fontSize: 18, fontWeight: 700 }}
            />
          </Pressable>
          {input}
        </InputGroup>
      )}

      <Text
        variant={'smallText'}
        p={'2'}
        pr={'4'}
        textAlign={'right'}
        onPress={preventMultiCalls(() => openModal(rootScreens.privacy.name))}
        suppressHighlighting
      >
        {I18n.t('joinUs-getConfirmationCode')}
        <Text variant={'smallTextAction'} underline color={colors.textAction}>
          {I18n.t('joinUs-privacyPolicy')}
        </Text>
      </Text>

      {!isValid && (
        <HStack
          space={'1'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          mr={'4'}
          my={'1'}
        >
          <Icon name={Icons.Warning} color={'textAction'} size={'ic-2xs'} />
          <Text variant={'smallText'} textAlign={'right'}>
            {I18n.t('joinUs-enterValid') + ' ' + I18n.t(key)}
          </Text>
        </HStack>
      )}

      <Button
        onPress={() => confirmIdentity(value)}
        variant={'primary'}
        mt={'2'}
        disabled={!isValid || value === ''}
        isLoading={status === 'loading'}
      >
        {I18n.t('common-confirm') + ' ' + I18n.t(key)}
      </Button>
    </Box>
  );
};

export default React.memo<IEmailOrPhoneProps>(EmailOrPhone);
