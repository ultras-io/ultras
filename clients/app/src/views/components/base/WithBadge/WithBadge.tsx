import React from 'react';
import { View } from 'react-native';
import { Badge } from 'native-base';
import { IBadgeProps } from './types';
import styles from './styles';

const WithBadge: React.FC<IBadgeProps> = ({ variant, number, children }) => {
  return (
    <View style={styles.withContainer}>
      {children}
      <Badge variant={variant} style={styles.container}>
        {number}
      </Badge>
    </View>
  );
};

export default React.memo<IBadgeProps>(WithBadge);
