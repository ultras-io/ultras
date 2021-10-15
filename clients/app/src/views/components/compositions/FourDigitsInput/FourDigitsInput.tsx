import React from 'react';
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
  const [code, setCode] = React.useState('    ');
  const [activeInput, setActiveInput] = React.useState(-1);

  const firstInput = React.useRef(null);
  const secondInput = React.useRef(null);
  const thirdInput = React.useRef(null);
  const fourthInput = React.useRef(null);

  const refs = React.useMemo(
    () => [firstInput, secondInput, thirdInput, fourthInput],
    [],
  );

  const onFocus = React.useCallback(
    inputIndex => () => {
      let k = inputIndex - 1;
      while (code[k] === ' ' && k >= 0) k--;
      setActiveInput(k + 1);
      refs[k + 1].current?.focus();
    },
    [setActiveInput, refs, code],
  );

  const onBlur = React.useCallback(() => {
    setActiveInput(-1);
  }, [setActiveInput]);

  const getNewCode = React.useCallback((oldCode, index, key) => {
    return oldCode.substring(0, index) + key + oldCode.substring(index + 1);
  }, []);

  const onInputChange = React.useCallback(
    order => e => {
      const {key} = e.nativeEvent;
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
    [code, setCode, refs, onFill, getNewCode],
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
