import React from 'react';
import { Box } from 'native-base';
import FourDigitsInputs from './components/FourDigitsInputs';
import FourDigitsMessage from './components/FourDigitsMessage';
import type { IFourDigitsProps } from './types';

const FourDigits: React.FC<IFourDigitsProps> = ({
  colorMode,
  isShowError,
  isResendSucceed,
  isLoading,
  resendAfter,
  verifyCode,
  onResendPress,
}) => {
  return (
    <Box alignSelf="flex-end">
      <FourDigitsInputs
        colorMode={colorMode}
        isLoading={isLoading}
        verifyCode={verifyCode}
      />

      <FourDigitsMessage
        colorMode={colorMode}
        isShowError={isShowError}
        isResendSucceed={isResendSucceed}
        isLoading={isLoading}
        resendAfter={resendAfter}
        onResendPress={onResendPress}
      />
    </Box>
  );
};

export default FourDigits;
