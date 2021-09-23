import React from 'react';
import {View, Text} from 'react-native';

import {IButtonProps} from './types';

import styles from './styles';

const Button: React.FC<IButtonProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Button;
