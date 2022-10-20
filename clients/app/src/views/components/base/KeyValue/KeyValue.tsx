import React from 'react';
import { VStack, Text } from 'native-base';
import { InputSection } from 'views/components/base/InputSection';
import { KeyValueInner } from './KeyValueInner';
import { IKeyValueProps } from './types';

const KeyValue: React.FC<IKeyValueProps> = ({
  viewMode = 'inline',
  name,
  value,
  description,
  options,
  onChange,
}) => {
  return (
    <VStack>
      <InputSection>
        <KeyValueInner
          viewMode={viewMode}
          name={name}
          value={value}
          options={options}
          onChange={onChange}
        />
      </InputSection>

      {description && (
        <Text variant={'cardStats'} p={'2'}>
          {description}
        </Text>
      )}
    </VStack>
  );
};

export default React.memo<IKeyValueProps>(KeyValue);
