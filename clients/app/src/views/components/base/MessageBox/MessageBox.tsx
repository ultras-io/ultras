import React from 'react';

import Box from 'views/components/base/Box';

import { IMessageBoxProps, SideEnum } from './types';
import styles from './styles';

const MessageBox: React.FC<IMessageBoxProps> = ({ children, side = SideEnum.Left }) => {
  return (
    <Box
      bgColor={side === SideEnum.Left ? 'text' : 'quaternary'}
      style={[styles.container, side === SideEnum.Right ? styles.right : styles.left]}
    >
      {children}
    </Box>
  );
};

export default React.memo<IMessageBoxProps>(MessageBox);
