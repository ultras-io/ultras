import React from 'react';
import {View} from 'react-native';
import Badge from '.';

import {IWithBadgeProps, IBadgeProps, Size, Color} from './types';
import styles from './styles';

export const WithBadge: React.FC<IBadgeProps & IWithBadgeProps> = ({
  number,
  size = Size.Default,
  color = Color.Default,
  children,
}) => {
  return (
    <View style={styles.withContainer}>
      {children}
      <Badge number={number} size={size} color={color} />
    </View>
  );
};
