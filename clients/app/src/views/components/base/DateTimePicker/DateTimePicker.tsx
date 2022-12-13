import React from 'react';
import PickerWrapper from './PickerWrapper';
import { IDatePickerProps } from './types';

export const DatePicker: React.FC<IDatePickerProps> = ({
  autoclose = true,
  ...restProps
}) => {
  return (
    <PickerWrapper
      mode={'date'}
      minimumDate={new Date()}
      autoclose={autoclose}
      {...restProps}
    />
  );
};

export const TimePicker: React.FC<IDatePickerProps> = ({
  autoclose = false,
  ...restProps
}) => {
  return (
    <PickerWrapper
      mode={'time'}
      minuteInterval={10}
      autoclose={autoclose}
      {...restProps}
    />
  );
};
