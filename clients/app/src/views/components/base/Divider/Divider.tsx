import React from 'react';
import styled from 'styled-components/native';

import {IDividerProps, TypeEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  types: {
    [TypeEnum.Dot]: styles.dot,
    [TypeEnum.Horizontal]: styles.horizontal,
    [TypeEnum.Vertical]: styles.vertical,
  },
};

const StyledView = styled.View<IDividerProps>`
  background-color: ${({theme}) => {
    return theme.colors.secondaryText;
  }};
`;

const Devider: React.FC<IDividerProps> = ({type = TypeEnum.Dot}) => {
  return (
    <StyledView style={[styles.container, stylesDictionary.types[type]]} />
  );
};

export default React.memo<IDividerProps>(Devider);
