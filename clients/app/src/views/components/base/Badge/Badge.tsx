import React from 'react';
import styled from 'styled-components/native';

import UltrasText from 'views/components/base/UltrasText';
import {getReadableNumber} from 'utils/helpers/readableNumber';

import {IBadgeProps, SizeEnum} from './types';
import styles from './styles';

const getStyles = (size: SizeEnum) => {
  switch (size) {
    case SizeEnum.Small:
      return {bagdeStyles: styles.badgeSmall, numberStyles: styles.numberSmall};
    case SizeEnum.Big:
      return {bagdeStyles: styles.badgeBig, numberStyles: styles.numberBig};
    default:
      return {
        bagdeStyles: styles.badgeDefault,
        numberStyles: styles.numberDefault,
      };
  }
};

const StyledView = styled.View<IBadgeProps>`
  background-color: ${({theme, bgColor}) => {
    return bgColor ? theme.colors[bgColor] : theme.colors.bgColor;
  }};
`;

const Badge: React.FC<IBadgeProps> = ({
  number,
  size = SizeEnum.Default,
  color = 'text',
  bgColor,
}) => {
  const {bagdeStyles, numberStyles} = getStyles(size);

  return (
    <StyledView bgColor={bgColor} style={[styles.container, bagdeStyles]}>
      <UltrasText style={[styles.number, numberStyles]} color={color}>
        {getReadableNumber(number)}
      </UltrasText>
    </StyledView>
  );
};

export default React.memo<IBadgeProps>(Badge);
