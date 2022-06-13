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
import prevertMulticalls from 'utils/helpers/prevertMulticalls';
import rootScreens from 'views/navigation/screens/rootScreens';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import type { IEmailOrPhoneProps } from '../types';

const EmailOrPhone: React.FC<IEmailOrPhoneProps> = ({
  onPress,
  onModalOpen,
  code,
  isEmail,
  emailPhoneKey,
}) => {
  const [isValid, setIsValid] = React.useState(true);
  const [value, setValue] = React.useState('');

  const { colors } = useTheme();
  const { openModal } = useNavigationWithParams();

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
      placeholder={I18n.t('enter') + ' ' + I18n.t(emailPhoneKey)}
      keyboardType={isEmail ? 'email-address' : 'number-pad'}
      returnKeyType="done"
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
              children={code}
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

      <Pressable onPress={prevertMulticalls(() => openModal(rootScreens.privacy.name))}>
        <Text variant={'smallText'} p={'2'} pr={'4'} textAlign={'right'}>
          {I18n.t('joinUsGetConfirmationCode')}
          <Text variant={'smallText'} underline color={colors.textAction}>
            {I18n.t('joinUsPrivacyPolicy')}
          </Text>
        </Text>
      </Pressable>

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
            {I18n.t('joinUsEnterValidEmailPhone') + ' ' + I18n.t(emailPhoneKey)}
          </Text>
        </HStack>
      )}

      <Button
        onPress={() => onPress(isEmail, isEmail ? value : code + value)}
        variant={'primary'}
        mt={'2'}
        disabled={!isValid}
      >
        {I18n.t('confirm') + ' ' + I18n.t(emailPhoneKey)}
      </Button>
    </Box>
  );
};

export default React.memo<IEmailOrPhoneProps>(EmailOrPhone);
