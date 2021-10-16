import React, {useState, useCallback} from 'react';
import {withTheme} from 'styled-components/native';
import styled from 'styled-components/native';

import {View} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import rootScreens from 'navigation/root/rootScreens';
import {keyEnum as SearchListKey} from 'views/screens/SearchListModal';

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

  const _onPressIn = useCallback(() => {
    if (_isSelect) {
      openModal(rootScreens.searchListModal.name, {key: SearchListKey.Code});
    }
  }, [_isSelect, openModal]);

  return (
    <View style={styles.container}>
      <StyledInput
        style={[
          styles.input,
          withBorder && styles.inputBorder,
          _isSelect && styles.inputSelect,
        ]}
        onChangeText={_onChangeText}
        value={_value}
        defaultValue={value}
        placeholder={name}
        keyboardType={keyboardTypes[type]}
        autoCorrect={false}
        onEndEditing={_onEndEditing}
        onPressIn={_onPressIn}
        placeholderTextColor={theme?.colors.secondaryText}
        selectionColor={theme?.colors.secondaryText}
        autoCapitalize="none"
        editable={!_isSelect}
      />
      {_isSelect && (
        <View style={styles.icon}>
          <Icon name={Icons.ArrowDown} size={12} />
        </View>
      )}
    </View>
  );
};

export default React.memo<IInputProps>(withTheme(Input));
