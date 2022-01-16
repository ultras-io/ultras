import styled from 'styled-components/native';
import { IBoxProps } from './types';

const Box = styled.View<IBoxProps>`
  background-color: ${({ theme, bgColor }) => {
    return bgColor ? theme.colors[bgColor] : theme.colors.transparent;
  }};
  border-color: ${({ theme, borderColor }) => {
    return borderColor ? theme.colors[borderColor] : theme.colors.transparent;
  }};
`;

export default Box;
