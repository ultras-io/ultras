import React, { useMemo, useState, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Input as NativeBaseInput } from 'native-base';
import { useTheme } from 'themes';
// import { withTheme } from 'styled-components/native';
// import styled from 'styled-components/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { rootScreens } from 'views/navigation/screens';
import { dataTypeEnum as SearchListKey } from 'views/screens/SearchListModal';

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
      borderColor: colors.inputBackground,
      backgroundColor: colors.inputBackground,
      color: colors.inputForeground,
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
    openModal(rootScreens.searchListModal.name, { dataKey: SearchListKey.Country });
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
            borderColor="inputBackground"
            bgColor="inputBackground"
          >
            <UltrasText color={_value ? 'inputForegroundOpacity' : 'inputForeground'}>
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
          placeholderTextColor={colors.inputForeground}
          selectionColor={colors.inputForeground}
          autoCapitalize="none"
          clearButtonMode={'always'}
          borderRadius={10}
          color={colors.inputBackground}
          _focus={{
            color: colors.inputBackground,
          }}
        />
      )}
    </View>
  );
};

export default React.memo<IInputProps>(Input);
