import React from 'react';
import { HStack, Text, Switch } from 'native-base';
import { useTheme } from 'themes';
import { IKeyValueProps } from './types';

export const KeyValueInner: React.FC<IKeyValueProps> = ({ name, value }) => {
  const { colors } = useTheme();

  const rightComponent =
    typeof value === 'boolean' ? (
      <Switch value={value} onTrackColor={colors.buttonPrimary} />
    ) : (
      <Text variant={'matchDate'}>{value}</Text>
    );

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} p={'3'}>
      <Text variant={'messageInvert'}>{name}</Text>
      {rightComponent}
    </HStack>
  );
};
