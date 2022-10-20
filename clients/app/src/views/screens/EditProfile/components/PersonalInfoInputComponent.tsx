import React from 'react';
import { Input } from 'native-base';
import { useTheme } from 'themes';
import { KeyValueInner } from 'views/components/base/KeyValue';
import { IPersonalInfoInputComponentProps } from './types';

const PersonalInfoInputComponent: React.FC<IPersonalInfoInputComponentProps> = ({
  name,
  value,
  onChange,
}) => {
  const { colors } = useTheme();

  return (
    <KeyValueInner
      viewMode="label"
      name={name}
      value={
        <Input
          backgroundColor={colors.transparent}
          padding={0}
          fontSize="4xl"
          value={value || ''}
          onChange={onChange}
          clearButtonMode="never"
        />
      }
    />
  );
};

export default PersonalInfoInputComponent;
