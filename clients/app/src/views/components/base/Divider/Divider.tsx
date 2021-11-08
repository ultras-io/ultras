import React from 'react';

import Box from 'views/components/base/Box';

import {IDividerProps, TypeEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  types: {
    [TypeEnum.Dot]: styles.dot,
    [TypeEnum.Horizontal]: styles.horizontal,
    [TypeEnum.Vertical]: styles.vertical,
  },
};

const Devider: React.FC<IDividerProps> = ({type = TypeEnum.Dot, bgColor}) => {
  return (
    <Box
      style={[styles.container, stylesDictionary.types[type]]}
      bgColor={bgColor ? bgColor : 'bgColorLight'}
    />
  );
};

export default React.memo<IDividerProps>(Devider);
