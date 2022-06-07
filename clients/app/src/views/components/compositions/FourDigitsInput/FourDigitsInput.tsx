import React from 'react';
import { View, Platform } from 'react-native';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';

import { IFourDigitsInputProps } from './types';
import styles from './styles';

const FourDigitsInput: React.FC<IFourDigitsInputProps> = ({ onFill }) => {
  const [code, setCode] = React.useState('    ');
  const [activeInput, setActiveInput] = React.useState(-1);

  const firstInput = React.useRef(null);
  const secondInput = React.useRef(null);
  const thirdInput = React.useRef(null);
  const fourthInput = React.useRef(null);

  const refs = React.useMemo(
    () => [firstInput, secondInput, thirdInput, fourthInput],
    []
  );

  const onFocus = React.useCallback(
    inputIndex => () => {
      let k = inputIndex - 1;
      while (code[k] === ' ' && k >= 0) k--;
      setActiveInput(k + 1);
      refs[k + 1].current?.focus();
    },
    [setActiveInput, refs, code]
  );

  const onBlur = React.useCallback(() => {
    setActiveInput(-1);
  }, [setActiveInput]);

  const getNewCode = React.useCallback((oldCode, index, key) => {
    return oldCode.substring(0, index) + key + oldCode.substring(index + 1);
  }, []);

  const onInputChange = React.useCallback(
    order => e => {
      const { key } = e.nativeEvent;
      if (key >= 0 && key <= 9) {
        const newCode = getNewCode(code, order, key);
        setCode(newCode);
        if (order < 3) {
          refs[order + 1].current?.focus();
        }
        if (!newCode.includes(' ')) {
          onFill(newCode);
        }
      } else if (key === 'Backspace') {
        setCode(getNewCode(code, order, ' '));
        if (code[order] === ' ' && order > 0) {
          setCode(getNewCode(code, order - 1, ' '));
          refs[order - 1].current?.focus();
        }
      }
    },
    [code, setCode, refs, onFill, getNewCode]
  );

  // onKeyPress event is not working for Android (as described in en docs), so here we go
  const onChangeAndroid = React.useCallback(
    order => e => {
      const { text } = e.nativeEvent;
      if (text >= 0 && text <= 9) {
        const newCode = getNewCode(code, order, text);
        setCode(() => newCode);
        if (order < 3) {
          refs[order + 1].current?.focus();
        }
        if (!newCode.includes(' ')) {
          onFill(newCode);
        }
      }
    },
    [code, setCode, refs, onFill, getNewCode]
  );

  return (
    <Box style={styles.container} bgColor={'textPrimary'}>
      <UltrasText style={styles.text}>4-digit confirmation code</UltrasText>
      <View style={styles.inputs}>
        {refs.map((ref, i) => (
          <View key={i} style={styles.item}>
            <StyledInput
              isActive={activeInput === i}
              onFocus={onFocus(i)}
              onBlur={onBlur}
              ref={ref}
              value={code[i] === ' ' ? '' : code[i]}
              style={styles.input}
              maxLength={1}
              onKeyPress={onInputChange(i)}
              onChange={Platform.OS === 'android' ? onChangeAndroid(i) : undefined}
              keyboardType={'numeric'}
              autoCorrect={false}
              placeholderTextColor={theme?.colors.backgroundMain}
              selectionColor={theme?.colors.backgroundMain}
              autoCapitalize="none"
              caretHidden={true}
            />
          </View>
        ))}
      </View>
    </Box>
  );
};

export default React.memo<IFourDigitsInputProps>(FourDigitsInput);
