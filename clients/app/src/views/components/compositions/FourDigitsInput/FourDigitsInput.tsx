import React, {useState, useRef, useCallback} from 'react';
import {withTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';

import {IFourDigitsInputProps} from './types';
import styles from './styles';

const StyledView = styled.View<IFourDigitsInputProps>`
  background-color: ${({theme}) => {
    return theme.colors.text;
  }};
`;

const StyledInput = styled.TextInput<
  {isActive: boolean} & IFourDigitsInputProps
>`
  background-color: ${({theme}) => {
    return theme.colors.text;
  }};
  border-color: ${({theme, isActive}) => {
    return isActive ? theme.colors.quaternary : theme.colors.textInvert;
  }};
`;

const FourDigitsInput: React.FC<IFourDigitsInputProps> = ({theme, onFill}) => {
  const [code, setCode] = useState('    ');
  const [activeInput, setActiveInput] = useState(-1);

  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);

  const refs = [firstInput, secondInput, thirdInput, fourthInput];

  const onFocus = useCallback(
    inputIndex => () => {
      setActiveInput(inputIndex);
    },
    [setActiveInput],
  );

  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, [setActiveInput]);

  const onInputChange = useCallback(
    order => e => {
      const {key} = e.nativeEvent;

      if (key >= 0 && key <= 9) {
        if (code[order] !== ' ') return;
        const newCode =
          code.substring(0, order) + key + code.substring(order + 1);
        setCode(newCode);
        if (order === 0) secondInput.current?.focus();
        else if (order === 1) thirdInput.current?.focus();
        else if (order === 2) fourthInput.current?.focus();
        else if (order === 3) onFill(newCode);
      } else if (key === 'Backspace') {
        setCode(code.substring(0, order) + ' ' + code.substring(order + 1));
        if (code[order] === ' ') {
          if (order > 0)
            setCode(code.substring(0, order - 1) + ' ' + code.substring(order));
          if (order === 1) firstInput.current?.focus();
          else if (order === 2) secondInput.current?.focus();
          else if (order === 3) thirdInput.current?.focus();
        }
      }
    },
    [code, setCode, firstInput, secondInput, thirdInput, fourthInput, onFill],
  );

  return (
    <StyledView style={styles.container}>
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
              style={[styles.input]}
              maxLength={1}
              onKeyPress={onInputChange(i)}
              keyboardType={'numeric'}
              autoCorrect={false}
              placeholderTextColor={theme?.colors.bgColor}
              selectionColor={theme?.colors.bgColor}
              autoCapitalize="none"
              caretHidden={true}
            />
          </View>
        ))}
      </View>
    </StyledView>
  );
};

export default React.memo<IFourDigitsInputProps>(withTheme(FourDigitsInput));
