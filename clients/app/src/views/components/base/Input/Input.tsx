import React, { useState, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { withTheme } from 'styled-components/native';
import styled from 'styled-components/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { rootScreens } from 'navigation/screens';
import { keyEnum as SearchListKey } from 'views/screens/SearchListModal';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';

import { IInputProps, TypeEnum, StateEnum, KeyboardTypes } from './types';
import styles from './styles';

const keyboardTypes: KeyboardTypes = {
  [TypeEnum.Text]: 'default',
  [TypeEnum.Email]: 'email-address',
  [TypeEnum.Number]: 'numeric',
  [TypeEnum.Phone]: 'phone-pad',
  [TypeEnum.Select]: 'default',
};

const StyledInput = styled.TextInput<IInputProps>`
  background-color: ${({ theme }) => {
    return theme.colors.opacityBgColor;
  }};
  border-color: ${({ theme }) => {
    return theme.colors.opacityBgColor;
  }};
  color: ${({ theme }) => {
    return theme.colors.text;
  }};
`;

const Input: React.FC<IInputProps> = ({
  theme,
  name,
  value,
  type = TypeEnum.Text,
  state = StateEnum.Default, // eslint-disable-line @typescript-eslint/no-unused-vars
  withBorder = false,
  validation, // eslint-disable-line @typescript-eslint/no-unused-vars
  onChange,
  onType,
}) => {
  const { openModal } = useNavigationWithParams();

  const _isSelect = type === TypeEnum.Select;
  const [_value, _setValue] = useState(value);

  const timerRef = React.useRef();

  const _resetTimer = React.useCallback(() => {
    clearTimeout(timerRef.current);
  }, [timerRef]);

  const _runTimeoutUpdate = React.useCallback(
    value => {
      _resetTimer();
      timerRef.current = setTimeout(() => onChange && onChange(value), 600);
    },
    [onChange, _resetTimer]
  );

  const _onChangeText = useCallback(
    text => {
      _setValue(text);
      onType && onType(text);
      _runTimeoutUpdate({
        isValid: true,
        value: text,
      });
    },
    [_setValue, onType, _runTimeoutUpdate]
  );

  const _onEndEditing = useCallback(
    e => {
      _resetTimer();
      onChange &&
        onChange({
          isValid: true,
          value: e.nativeEvent.text,
        });
    },
    [onChange, _resetTimer]
  );

  const openSelectModal = useCallback(() => {
    openModal(rootScreens.searchListModal.name, { dataKey: SearchListKey.Code });
  }, [openModal]);

  React.useEffect(() => {
    return () => {
      _resetTimer();
    };
  }, [_resetTimer]);

  return (
    <View style={styles.container}>
      {_isSelect ? (
        <Pressable onPress={openSelectModal}>
          <Box
            style={styles.select}
            bgColor={'opacityBgColor'}
            borderColor={'opacityBgColor'}
          >
            <UltrasText color={_value ? 'text' : 'secondaryText'}>
              {_value ? _value : name}
            </UltrasText>
            <View style={styles.icon}>
              <Icon name={Icons.ArrowDown} size={12} />
            </View>
          </Box>
        </Pressable>
      ) : (
        <StyledInput
          style={[styles.input, withBorder && styles.inputBorder]}
          onChangeText={_onChangeText}
          onEndEditing={_onEndEditing}
          value={_value}
          defaultValue={value}
          placeholder={name}
          keyboardType={keyboardTypes[type]}
          autoCorrect={false}
          placeholderTextColor={theme?.colors.secondaryText}
          selectionColor={theme?.colors.secondaryText}
          autoCapitalize="none"
          clearButtonMode={'always'}
        />
      )}
    </View>
  );
};

export default React.memo<IInputProps>(withTheme(Input));
