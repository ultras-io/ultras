import React from 'react';
import { HStack, Text, Switch } from 'native-base';
import { useTheme } from 'themes';
import { IKeyValueProps } from './types';

export const KeyValueInner: React.FC<IKeyValueProps> = ({ name, value, onChange }) => {
  const { colors } = useTheme();

  let rightComponent = null;
  if (typeof value === 'boolean')
    rightComponent = (
      <Switch
        value={value}
        onTrackColor={colors.buttonPrimary}
        onChange={e => {
          onChange && onChange(e.nativeEvent.value);
        }}
      />
    );
  else if (typeof value === 'string')
    rightComponent = <Text variant={'matchDate'}>{value}</Text>;
  else rightComponent = value;

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} p={'3'}>
      <Text variant={'messageInvert'}>{name}</Text>
      {rightComponent}
    </HStack>
  );
};
