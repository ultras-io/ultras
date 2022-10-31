import React from 'react';
import { Keyboard } from 'react-native';
import { Box } from 'native-base';
import FourDigitsComponent from 'views/components/compositions/FourDigits';
import registrationStore, { IState } from 'stores/registration';
import { IFourDigitsProps } from '../types';

const FourDigits: React.FC<IFourDigitsProps> = ({ useStore }) => {
  const statusSelector = React.useCallback(() => (state: IState) => state.status, []);
  const statusNextSelector = React.useCallback(
    () => (state: IState) => state.statusNext,
    []
  );
  const isCodeValidSelector = React.useCallback(
    () => (state: IState) => state.user.isCodeValid,
    []
  );
  const userExistsSelector = React.useCallback(
    () => (state: IState) => state.user.exists,
    []
  );

  const status = useStore(statusSelector());
  const statusNext = useStore(statusNextSelector());
  const isCodeValid = useStore(isCodeValidSelector());
  const userExists = useStore(userExistsSelector());
  const verifyCode = useStore(registrationStore.verifyCodeSelector());
  const nextStep = useStore(registrationStore.nextStepSelector());
  const toLoginStep = useStore(registrationStore.toLoginStepSelector());
  const confirmIdentity = useStore(registrationStore.confirmIdentitySelector());

  React.useLayoutEffect(() => {
    if (statusNext === 'success') {
      Keyboard.dismiss();
      if (isCodeValid) {
        if (userExists) toLoginStep();
        else nextStep();
      }
    }
  }, [statusNext, isCodeValid, userExists, nextStep, toLoginStep]);

  const showError = !isCodeValid && statusNext === 'success';

  return (
    <Box mr={5} my={2}>
      <FourDigitsComponent
        colorMode="light"
        isShowError={showError}
        isResendSucceed={status === 'success'}
        isLoading={status === 'loading' || statusNext === 'loading'}
        verifyCode={verifyCode}
        onResendPress={() => confirmIdentity()}
      />
    </Box>
  );
};

export default FourDigits;
