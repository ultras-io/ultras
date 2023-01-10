import React from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  TextInputChangeEventData,
} from 'react-native';
import { Box, Button, Input, Text, VStack } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import FourDigits from 'views/components/compositions/FourDigits';
import KeyValue from 'views/components/base/KeyValue';
import * as editProfileStore from 'stores/editProfile';
import authenticationStore, { IState as IAuthState } from 'stores/authentication';
import {
  ConfirmationType,
  UpdatableFieldNameType,
  IUpdateFieldContainerProps,
} from '../types';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

type ChangeEventType = NativeSyntheticEvent<TextInputChangeEventData>;

const useAuthenticationStore = authenticationStore.initStore();

const UpdateFieldContainer: React.FC<IUpdateFieldContainerProps> = ({ label, name }) => {
  const updateUserField = useAuthenticationStore(
    (state: IAuthState) => state.updateUserField
  );

  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  const [confirmation, setConfirmation] = React.useState<ConfirmationType>('none');

  const useStore = editProfileStore.initStore();
  const store = useStore();

  const refInitial = React.useRef<string>(store[name].value);

  const restProps = React.useMemo(() => {
    const defaultProps: any = {
      onChange: (e: ChangeEventType) => store.setFieldValue(name, e.nativeEvent.text),
    };

    if (name === 'email') {
      defaultProps.keyboardType = 'email-address';
    } else if (name === 'phone') {
      defaultProps.keyboardType = 'phone-pad';
      defaultProps.onChange = (e: ChangeEventType) => {
        store.setFieldValue(name, e.nativeEvent.text.replace(/[^\+\d]/g, ''));
      };
    }

    return defaultProps;
  }, [name, store]);

  const sendConfirmationCode = React.useCallback(async () => {
    setConfirmation('loading');
    const response = await store.sendCode(name);
    const status = response?.body?.data?.status;

    if (status === 'confirmation-sent') {
      setConfirmation('pending');
    } else if (status === 'user-exists') {
      setConfirmation('user-exists');
    }
  }, [name, store]);

  const onSavePress = React.useCallback(async () => {
    if (name === 'fullname') {
      await store.update(name);
      updateUserField(name, store[name as UpdatableFieldNameType].value);

      return goBack();
    }

    if (name === 'email' || name === 'phone') {
      await sendConfirmationCode();
    }
  }, [name, store, updateUserField, goBack, sendConfirmationCode]);

  const verifyCode = React.useCallback(
    async (code: string) => {
      await store.update(name, code);
      updateUserField(name, store[name as UpdatableFieldNameType].value);

      goBack();
    },
    [goBack, name, store, updateUserField]
  );

  const onResendPress = React.useCallback(async () => {
    await sendConfirmationCode();
  }, [sendConfirmationCode]);

  const isShowError = false;
  const isResendSucceed = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box padding={4} flex={1} justifyContent="space-between">
        <VStack space={4}>
          <VStack space={1}>
            <Text variant="standard">{label}</Text>
            <KeyValue
              viewMode="none"
              value={
                <Input
                  backgroundColor={colors.transparent}
                  padding={2}
                  fontSize="4xl"
                  value={store[name].value || ''}
                  returnKeyType="done"
                  {...restProps}
                />
              }
            />
          </VStack>

          {confirmation !== 'none' && (
            <Box>
              {confirmation !== 'user-exists' ? (
                <FourDigits
                  colorMode="dark"
                  isShowError={isShowError}
                  isResendSucceed={isResendSucceed}
                  isLoading={confirmation === 'loading'}
                  verifyCode={verifyCode}
                  onResendPress={onResendPress}
                />
              ) : (
                <Text variant="errorLabel">
                  {I18n.t(
                    name === 'email'
                      ? 'profile-edit-userExists-email'
                      : name === 'phone'
                      ? 'profile-edit-userExists-phone'
                      : ''
                  )}
                </Text>
              )}
            </Box>
          )}
        </VStack>

        <Button
          disabled={
            refInitial.current === store[name].value ||
            confirmation === 'loading' ||
            confirmation === 'pending'
          }
          variant="primary"
          onPress={onSavePress}
        >
          {I18n.t(confirmation === 'none' ? 'common-save' : 'common-confirm')}
        </Button>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default UpdateFieldContainer;
