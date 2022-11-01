import React from 'react';
import { VStack, HStack, Text, Pressable, Skeleton } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import { IFourDigitsLoaderProps, IFourDigitsMessageProps } from '../types';

const FourDigitsMessage: React.FC<IFourDigitsMessageProps> = ({
  colorMode,
  isShowError,
  isResendSucceed,
  isLoading,
  resendAfter = 60,
  onResendPress,
}) => {
  const refCycle = React.useRef<number>(resendAfter);
  const refTimer = React.useRef<null | NodeJS.Timer>(null);

  const [time, setTime] = React.useState(refCycle.current);

  const startTimer = React.useCallback(() => {
    clearInterval(refTimer.current!);
    refTimer.current = setInterval(() => {
      setTime(oldTime => oldTime - 1);
    }, 1000);

    setTime(refCycle.current);
  }, []);

  const clearTimer = React.useCallback(() => {
    clearInterval(refTimer.current!);
    refTimer.current = null;

    setTime(refCycle.current);
  }, []);

  React.useLayoutEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [clearTimer, startTimer]);

  React.useLayoutEffect(() => {
    if (time === 0) {
      clearTimer();
    }
  }, [clearTimer, time]);

  React.useLayoutEffect(() => {
    if (isResendSucceed && !refTimer.current) {
      startTimer();
    }
  }, [isResendSucceed, startTimer]);

  if (isLoading) {
    return <FourDigitsMessageLoader colorMode={colorMode} />;
  }

  const canResend = refTimer.current === null;

  return (
    <VStack marginRight={2} marginTop={1.5}>
      <HStack space={1} justifyContent="flex-end" alignItems="center">
        {isShowError && <Icon name={Icons.Warning} color="textAction" size="ic-2xs" />}
        <Text variant="smallText" textAlign="right">
          {isShowError
            ? I18n.t('fourDigits-codeWrong')
            : I18n.t('fourDigits-codeNotReceived')}
        </Text>
      </HStack>

      <Pressable disabled={!canResend} onPress={onResendPress}>
        <Text variant={canResend ? 'smallTextAction' : 'smallText'} textAlign="right">
          {I18n.t('fourDigits-requestAgain')}
          {!canResend ? ' (' + time + ')' : ''}
        </Text>
      </Pressable>
    </VStack>
  );
};

export default FourDigitsMessage;

const FourDigitsMessageLoader: React.FC<IFourDigitsLoaderProps> = ({ colorMode }) => {
  const { colors } = useTheme();

  const [colorStart, colorEnd] = React.useMemo(() => {
    if (colorMode === 'light') {
      return [colors.textPrimary, colors.textSeptenary];
    }

    return [colors.textSenaryInvert, colors.textSeptenaryInvert];
  }, [colorMode, colors]);

  return (
    <VStack marginRight={2} marginTop={3}>
      <Skeleton.Text
        lines={2}
        space={1}
        alignItems="flex-end"
        startColor={colorStart}
        endColor={colorEnd}
      />
    </VStack>
  );
};
