import React from 'react';
import styled from 'styled-components/native';

import {IUltrasTextProps} from './types';

const StyledText = styled.Text<IUltrasTextProps>`
  color: ${({theme, color}) => {
    return color ? theme.colors[color] : theme.colors.textInvert;
  }};
`;

const UltrasText: React.FC<IUltrasTextProps> = ({
  children,
  style,
  color,
  numberOfLines,
}) => {
  return (
    <StyledText
      style={style}
      color={color}
      adjustsFontSizeToFit
      allowFontScaling
      numberOfLines={numberOfLines}>
      {children}
    </StyledText>
  );
};

export default React.memo<IUltrasTextProps>(UltrasText);
