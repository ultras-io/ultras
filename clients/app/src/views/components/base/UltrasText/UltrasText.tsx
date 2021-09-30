import React from 'react';
import {Text} from 'react-native';

import {IUltrasTextProps} from './types';
import styles from './styles';

const UltrasText: React.FC<IUltrasTextProps> = ({style, children}) => {
  return <Text style={[style, styles.text]}>{children}</Text>;
};

export default React.memo<IUltrasTextProps>(UltrasText);
