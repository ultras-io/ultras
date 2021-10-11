import React from 'react';
import styled from 'styled-components/native';

import {IMessageBoxProps, SideEnum} from './types';
import styles from './styles';

const StyledView = styled.View<IMessageBoxProps>`
  background-color: ${({theme, side}) => {
    return side === SideEnum.Left ? theme.colors.text : theme.colors.quaternary;
  }};
`;

const MessageBox: React.FC<IMessageBoxProps> = ({
  children,
  side = SideEnum.Left,
}) => {
  return (
    <StyledView
      side={side}
      style={[
        styles.container,
        side === SideEnum.Right ? styles.right : styles.left,
      ]}>
      {children}
    </StyledView>
  );
};

export default React.memo<IMessageBoxProps>(MessageBox);
