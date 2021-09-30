import React from 'react';
import {View} from 'react-native';

import {IDividerProps, TypeEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  types: {
    [TypeEnum.Dot]: styles.dot,
    [TypeEnum.Horizontal]: styles.horizontal,
    [TypeEnum.Vertical]: styles.vertical,
  },
};

const Devider: React.FC<IDividerProps> = ({type = TypeEnum.Dot}) => {
  return <View style={[styles.container, stylesDictionary.types[type]]} />;
};

export default React.memo<IDividerProps>(Devider);
