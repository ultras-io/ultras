import React, {useCallback, useEffect, useState, useRef} from 'react';
import {View} from 'react-native';

import FourDigitsInput from 'views/components/compositions/FourDigitsInput';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from '../../../assets/icons';
import Button, {
  SizeEnum as ButtonSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';

import {IFourDigitsContainerProps} from './types';
import styles from './styles';

const SMS_TIME = 60;

const FourDigitsContainer: React.FC<IFourDigitsContainerProps> = ({
  passStep,
}) => {
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
    [rightCode, setIsFilledWrong, passStep],
  );

  return (
    <View style={styles.container}>
      <FourDigitsInput onFill={onFill} />
      <View style={styles.textAndButton}>
        {isFilledWrong && (
          <UltrasText style={styles.text}>
            <Icon key="icon" name={Icons.Hearth} size={12} color="yellow" />{' '}
            Please enter the correct code
          </UltrasText>
        )}
        <Button
          appearance={ButtonAppearance.UnderLined}
          size={ButtonSize.Small}
          color={'tint'}
          isDisabled={waitingTime > 0}
          title={
            waitingTime > 0
              ? 'Text should arrive within ' + waitingTime + 's'
              : "Didn't get a text? Send text again."
          }
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default React.memo<IFourDigitsContainerProps>(FourDigitsContainer);
