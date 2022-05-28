import React, { useMemo, useState, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Input as NativeBaseInput } from 'native-base';
import { useTheme } from 'themes';
// import { withTheme } from 'styled-components/native';
// import styled from 'styled-components/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { rootScreens } from 'views/navigation/screens';
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

const Input: React.FC<IInputProps> = ({
  name,
  value,
  type = TypeEnum.Text,
  state = StateEnum.Default, // eslint-disable-line @typescript-eslint/no-unused-vars
  withBorder = false,
  validation, // eslint-disable-line @typescript-eslint/no-unused-vars
  onChange,
  onType,
}) => {
  const { colors } = useTheme();

  const inputStyle = useMemo(
    () => ({
      ...styles.input,
      ...(withBorder ? styles.inputBorder : {}),
      borderColor: colors.inputBg,
      backgroundColor: colors.inputBg,
      color: colors.text,
    }),
    [colors, withBorder]
  );

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
          <Box style={styles.select} bgColor={'inputBg'} borderColor={'inputBg'}>
            <UltrasText color={_value ? 'text' : 'secondaryText'}>
              {_value ? _value : name}
            </UltrasText>
            <View style={styles.icon}>
              <Icon name={Icons.ArrowDown} size={12} />
            </View>
          </Box>
        </Pressable>
      ) : (
        <NativeBaseInput
          borderWidth={withBorder ? undefined : 0}
          style={inputStyle}
          onChangeText={_onChangeText}
          onEndEditing={_onEndEditing}
          value={_value}
          defaultValue={value}
          placeholder={name}
          keyboardType={keyboardTypes[type]}
          autoCorrect={false}
          placeholderTextColor={colors.secondaryText}
          selectionColor={colors.secondaryText}
          autoCapitalize="none"
          clearButtonMode={'always'}
          color={colors.inputBg}
          _focus={{
            color: colors.inputBg,
          }}
        />
      )}
    </View>
  );
};

export default React.memo<IInputProps>(Input);
