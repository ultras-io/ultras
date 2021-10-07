import React from 'react';
import {View} from 'react-native';

import Input, {TypeEnum as InputType} from 'views/components/base/Input';

import {IPhoneInputProps} from './types';
import styles from './styles';

const PhoneInput: React.FC<IPhoneInputProps> = ({
  codePlaceholder,
  numberPlaceholder,
  code = '',
  number = '',
}) => {
  // get data frop props
  // pass to Input
  // get new selected code from there
  // set new value

  return (
    <View style={styles.container}>
      <View style={styles.code}>
        <Input
          name={codePlaceholder || 'Code'}
          type={InputType.Select}
          value={code}
        />
      </View>
      <View style={styles.number}>
        <Input
          name={numberPlaceholder || 'Number'}
          type={InputType.Number}
          value={number}
        />
      </View>
    </View>
  );
};

export default React.memo<IPhoneInputProps>(PhoneInput);
