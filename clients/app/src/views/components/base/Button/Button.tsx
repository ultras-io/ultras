import React from 'react';

import UltrasText from 'views/components/base/UltrasText';
import styled from 'styled-components/native';
import Icon from '../Icon';

import {
  IButtonProps,
  SizeEnum,
  BoxSizeEnum,
  AppearanceEnum,
  IconPositionEnum,
} from './types';

import styles from './styles';

const getTextStyle = (size: SizeEnum) => {
  switch (size) {
    case SizeEnum.Small:
      return styles.textSizeSmall;
    case SizeEnum.Big:
      return styles.textSizeBig;
    default:
      return styles.textSizeDefault;
  }
};

const getPressableSizeStyle = (size: SizeEnum) => {
  switch (size) {
    case SizeEnum.Small:
      return styles.buttonSizeSmall;
    case SizeEnum.Big:
      return styles.buttonSizeBig;
    default:
      return styles.buttonSizeDefault;
  }
};

const getPressableBoxSizeStyle = (boxSize: BoxSizeEnum) => {
  switch (boxSize) {
    case BoxSizeEnum.Contain:
      return styles.buttonBoxSizeContain;
    default:
      return styles.buttonBoxSizeCover;
  }
};

const getIconSize = (size: SizeEnum) => {
  switch (size) {
    case SizeEnum.Small:
      return 10;
    case SizeEnum.Big:
      return 24;
    default:
      return 12;
  }
};

const StyledPressable = styled.Pressable<IButtonProps>`
  background-color: ${({theme, bgColor, appearance}) => {
    if (
      appearance === AppearanceEnum.Minimal ||
      appearance === AppearanceEnum.UnderLined ||
      appearance === AppearanceEnum.Outline
    )
      return theme.colors.transparent;
    return bgColor ? theme.colors[bgColor] : theme.colors.transparent;
  }};
  border-color: ${({theme, bgColor, appearance}) => {
    if (
      appearance === AppearanceEnum.Minimal ||
      appearance === AppearanceEnum.UnderLined
    )
      return theme.colors.transparent;
    return bgColor ? theme.colors[bgColor] : theme.colors.transparent;
  }};
`;

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  size = SizeEnum.Default,
  color = 'lightText',
  bgColor = 'primary',
  boxSize = BoxSizeEnum.Cover,
  appearance = AppearanceEnum.Default,
  icon,
  iconPosition = IconPositionEnum.Right,
  isLoading = false,
  isDisabled = false,
}) => {
  const textStyle = getTextStyle(size);
  const pressableSize = getPressableSizeStyle(size);
  const pressableBoxSize = getPressableBoxSizeStyle(boxSize);

  let content = [
    title !== undefined ? (
      <UltrasText
        key="text"
        style={[
          styles.text,
          textStyle,
          appearance === AppearanceEnum.UnderLined && styles.underlined,
        ]}
        color={color}>
        {title}
      </UltrasText>
    ) : null,
    icon !== undefined ? (
      <Icon key="icon" name={icon} size={getIconSize(size)} />
    ) : null,
  ];

  if (iconPosition === IconPositionEnum.Left) content = content.reverse();

  return (
    <StyledPressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      bgColor={bgColor}
      appearance={appearance}
      style={[
        styles.button,
        (isDisabled || isLoading) && styles.buttonDisabled,
        pressableSize,
        pressableBoxSize,
      ]}>
      {isLoading ? <UltrasText>loader...</UltrasText> : content}
    </StyledPressable>
  );
};

export default React.memo<IButtonProps>(Button);
