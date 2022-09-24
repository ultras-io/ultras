import React from 'react';
import { Platform } from 'react-native';
import { Actionsheet, Center, Text, useDisclose } from 'native-base';
import { useTheme } from 'themes';
import { IKeyValueDropdownProps } from './types';

const KeyValueDropdown: React.FC<IKeyValueDropdownProps> = ({
  name,
  value,
  options,
  onChange,
}) => {
  const { isOpen, onClose, onToggle } = useDisclose();
  const { colors } = useTheme();

  const entries = React.useMemo(() => {
    return Object.entries(options);
  }, [options]);

  const onPress = React.useCallback(
    (newValue: string) => {
      if (typeof onChange === 'function') {
        onChange(newValue);
        onClose();
      }
    },
    [onChange, onClose]
  );

  return (
    <>
      <Text variant={'matchDate'} onPress={onToggle}>
        {options[value]}
      </Text>

      <Actionsheet isOpen={isOpen} onClose={onClose} useRNModal={Platform.OS === 'ios'}>
        <Actionsheet.Content>
          <Center
            borderBottomWidth={'0.5'}
            borderColor={colors.backgroundCard}
            w={'full'}
            py={'3'}
          >
            <Text variant={'matchTime'}> {name}</Text>
          </Center>

          {entries.map(([itemKey, itemValue], i) => (
            <Actionsheet.Item
              key={`key-value-option-${i}-${itemKey}`}
              onPress={() => onPress(itemKey)}
            >
              {itemValue}
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

export default KeyValueDropdown;
