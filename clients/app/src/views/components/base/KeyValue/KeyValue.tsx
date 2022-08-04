import React from 'react';
import { VStack, Box, Text } from 'native-base';
import { useTheme } from 'themes';
import { KeyValueInner } from './KeyValueInner';
import { IKeyValueProps } from './types';

const KeyValue: React.FC<IKeyValueProps> = ({ name, value, description }) => {
  const { colors } = useTheme();

  return (
    <VStack>
      <Box bgColor={colors.backgroundInput} rounded={'lg'} overflow={'hidden'}>
        <KeyValueInner name={name} value={value} />
      </Box>

      {description && (
        <Text variant={'cardStats'} p={'2'}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default React.memo<IKeyValueProps>(KeyValue);
