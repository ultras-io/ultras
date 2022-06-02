import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import FourDigitsInput from 'views/components/compositions/FourDigitsInput';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';

import { IFourDigitsContainerProps } from './types';
import styles from './styles';

const SMS_TIME = 60;

const FourDigitsContainer: React.FC<IFourDigitsContainerProps> = ({ passStep }) => {
  const [isFilledWrong, setIsFilledWrong] = useState(false);
  const [waitingTime, setWaitingTime] = useState(SMS_TIME);
  const intervalRef = useRef();

  const startTimer = useCallback(() => {
    if (waitingTime > 0) {
      setWaitingTime(w => w - 1);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [waitingTime, setWaitingTime, intervalRef]);

  const onPress = useCallback(() => {
    setWaitingTime(SMS_TIME);
    intervalRef.current = setInterval(startTimer, 1000);
  }, [intervalRef, startTimer]);

  useEffect(() => {
    // set timer when new code recieved, not here
    intervalRef.current = setInterval(startTimer, 1000);
    return () => clearInterval(intervalRef.current);
  }, [intervalRef, startTimer]);

  // get code from backend
  const rightCode = '1234';

  const onFill = useCallback(
    code => {
      if (code !== rightCode) {
        setIsFilledWrong(true);
      } else {
        setIsFilledWrong(false);
        passStep(code);
      }
    },
    [rightCode, setIsFilledWrong, passStep]
  );

  return (
    <View style={styles.container}>
      <FourDigitsInput onFill={onFill} />
      <View style={styles.textAndButton}>
        {isFilledWrong && (
          <UltrasText style={styles.text} color={'textTertiary'}>
            <Icon
              key="icon"
              name={Icons.Warning}
              size={'ic-2xs'}
              color="iconNotification"
            />{' '}
            {I18n.t('joinUsWrongCode')}
          </UltrasText>
        )}
        {/* <Button
          appearance={ButtonAppearance.UnderLined}
          size={ButtonSize.Small}
          color="textQuaternary"
          isDisabled={waitingTime > 0}
          title={
            waitingTime > 0
              ? I18n.t('joinUsTextWillArive', { waitingTime })
              : I18n.t('joinUsSendAgainText')
          }
          onPress={onPress}
        /> */}
      </View>
    </View>
  );
};

export default React.memo<IFourDigitsContainerProps>(FourDigitsContainer);
