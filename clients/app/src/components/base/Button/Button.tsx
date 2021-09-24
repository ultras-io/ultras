import React from 'react';
import {Pressable, Text} from 'react-native';

import {IButtonProps} from './types';

import styles from './styles';

const Button: React.FC<IButtonProps> = ({title, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default Button;
