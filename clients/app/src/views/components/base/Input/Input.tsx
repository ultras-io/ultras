import React, {useState, useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {withTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import rootScreens from 'navigation/root/rootScreens';
import {keyEnum as SearchListKey} from 'views/screens/SearchListModal';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from 'assets/icons';

import {IInputProps, TypeEnum, StateEnum, KeyboardTypes} from './types';
import styles from './styles';

const keyboardTypes: KeyboardTypes = {
  [TypeEnum.Text]: 'default',
  [TypeEnum.Email]: 'email-address',
  [TypeEnum.Number]: 'numeric',
  [TypeEnum.Phone]: 'phone-pad',
  [TypeEnum.Select]: 'default',
};

const StyledInput = styled.TextInput<IInputProps>`
  background-color: ${({theme}) => {
    return theme.colors.opacityBgColor;
  }};
  border-color: ${({theme}) => {
    return theme.colors.opacityBgColor;
  }};
  color: ${({theme}) => {
    return theme.colors.text;
  }};
`;

const Input: React.FC<IInputProps> = ({
  theme,
  name,
  value,
  type = TypeEnum.Text,
  state = StateEnum.Default,
  withBorder = false,
  validation,
  onChange,
  onType,
}) => {
  const {openModal} = useNavigationWithParams();

  const _isSelect = type === TypeEnum.Select;
  const [_value, _setValue] = useState(value);

  const _onChangeText = useCallback(
    text => {
      _setValue(text);
      onType && onType(text);
    },
    [_setValue, onType],
  );

  const _onEndEditing = useCallback(
    e => {
      onChange &&
        onChange({
          isValid: true,
          value: e.nativeEvent.text,
        });
    },
    [onChange],
  );

  const openSelectModal = useCallback(() => {
    openModal(rootScreens.searchListModal.name, {key: SearchListKey.Code});
  }, [openModal]);

  return (
    <View style={styles.container}>
      {_isSelect ? (
        <Pressable onPress={openSelectModal}>
          <Box
            style={styles.select}
            bgColor={'opacityBgColor'}
            borderColor={'opacityBgColor'}>
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
          value={_value}
          defaultValue={value}
          placeholder={name}
          keyboardType={keyboardTypes[type]}
          autoCorrect={false}
          onEndEditing={_onEndEditing}
          placeholderTextColor={theme?.colors.secondaryText}
          selectionColor={theme?.colors.secondaryText}
          autoCapitalize="none"
        />
      )}
    </View>
  );
};

export default React.memo<IInputProps>(withTheme(Input));
