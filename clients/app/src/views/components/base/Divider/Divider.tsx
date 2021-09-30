import React from 'react';
import {View} from 'react-native';

import {IDividerProps, Type} from './types';
import styles from './styles';

const stylesDictionary = {
  types: {
    [Type.Dot]: styles.dot,
    [Type.Horizontal]: styles.horizontal,
    [Type.Vertical]: styles.vertical,
  },
};

const Devider: React.FC<IDividerProps> = ({type = Type.Dot}) => {
  return <View style={[styles.container, stylesDictionary.types[type]]} />;
};

export default React.memo<IDividerProps>(Devider);
