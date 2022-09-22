import React from 'react';
import { VStack, Text } from 'native-base';
import { FormControl } from 'views/components/base/FormControl';
import { KeyValueInner } from './KeyValueInner';
import { IKeyValueProps } from './types';

const KeyValue: React.FC<IKeyValueProps> = ({
  name,
  value,
  description,
  options,
  onChange,
}) => {
  return (
    <VStack>
      <FormControl>
        <KeyValueInner name={name} value={value} options={options} onChange={onChange} />
      </FormControl>

      {description && (
        <Text variant={'cardStats'} p={'2'}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default React.memo<IKeyValueProps>(KeyValue);
