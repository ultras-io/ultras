import React from 'react';
import { Input as RNInput } from 'native-base';
import { IInputProps } from './types';

const Input: React.FC<IInputProps> = ({
  onChange,
  debounce = true,
  onlyNumbers = false,
  ...props
}) => {
  const [value, setValue] = React.useState('');
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const resetTimer = React.useCallback(() => {
    clearTimeout(timerRef.current);
  }, [timerRef]);

  const runTimeoutUpdate = React.useCallback(
    text => {
      resetTimer();
      timerRef.current = setTimeout(() => onChange && onChange(text), 200);
    },
    [onChange, resetTimer]
  );

  const onChangeText = React.useCallback(
    text => {
      if (onlyNumbers) {
        text = text.replace(/[^0-9]/g, '');
      }
      setValue(text);
      if (debounce) runTimeoutUpdate(text);
      else onChange && onChange(text);
    },
    [onlyNumbers, debounce, runTimeoutUpdate, onChange]
  );

  return <RNInput {...props} onChangeText={onChangeText} value={value} />;
};

export default React.memo(Input);
