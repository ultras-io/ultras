import React from 'react';
import {View} from 'react-native';
import Badge from './index';

import {IWithBadgeProps, IBadgeProps, SizeEnum, ColorEnum} from './types';
import styles from './styles';

export const WithBadge: React.FC<IBadgeProps & IWithBadgeProps> = ({
  number,
  size = SizeEnum.Default,
  color = ColorEnum.Default,
  children,
}) => {
  return (
    <View style={styles.withContainer}>
      {children}
      <Badge number={number} size={size} color={color} />
    </View>
  );
};
