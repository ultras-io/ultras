import React from 'react';
import {Pressable} from 'react-native';
import UltrasText from 'views/components/base/UltrasText';

import Icon from '../Icon';

import {
  IButtonProps,
  SizeEnum,
  ColorEnum,
  AppearanceEnum,
  IconPositionEnum,
} from './types';

import styles from './styles';

const stylesDictionary = {
  sizes: {
    [SizeEnum.Small]: {
      pressable: styles.buttonSizeSmall,
      text: styles.textSizeSmall,
    },
    [SizeEnum.Default]: {
      pressable: styles.buttonSizeDefault,
      text: styles.textSizeDefault,
    },
    [SizeEnum.Big]: {
      pressable: styles.buttonSizeBig,
      text: styles.textSizeBig,
    },
  },
  colors: {
    [ColorEnum.Primary]: {
      pressable: styles.buttonColorPrimary,
      text: styles.textColorPrimary,
    },
    [ColorEnum.Secondary]: {
      pressable: styles.buttonColorSecondary,
      text: styles.textColorSecondary,
    },
    [ColorEnum.Default]: {
      pressable: styles.buttonColorDefault,
      text: styles.textColorDefault,
    },
    [ColorEnum.Danger]: {
      pressable: styles.buttonColorDanger,
      text: styles.textColorDanger,
    },
  },
  appearances: {
    [AppearanceEnum.Minimal]: {
      pressable: styles.buttonAppearanceMinimal,
      text: styles.textAppearanceMinimal,
    },
    [AppearanceEnum.Outline]: {
      pressable: styles.buttonAppearanceOutline,
      text: styles.textAppearanceOutline,
    },
    [AppearanceEnum.Default]: {
      pressable: styles.buttonAppearanceDefault,
      text: styles.textAppearanceDefault,
    },
  },
  iconSizes: {
    [SizeEnum.Small]: 10,
    [SizeEnum.Default]: 12,
    [SizeEnum.Big]: 24,
  },
};

const getStyles = (
  size: SizeEnum,
  color: ColorEnum,
  appearance: AppearanceEnum,
) => {
  return {
    pressableStyles: [
      stylesDictionary.sizes[size].pressable,
      stylesDictionary.colors[color].pressable,
      stylesDictionary.appearances[appearance].pressable,
    ],
    textStyles: [
      stylesDictionary.sizes[size].text,
      stylesDictionary.colors[color].text,
      stylesDictionary.appearances[appearance].text,
    ],
  };
};

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  size = SizeEnum.Default,
  color = ColorEnum.Default,
  appearance = AppearanceEnum.Default,
  icon,
  iconPosition = IconPositionEnum.Right,
  isLoading = false,
  isDisabled = false,
}) => {
  const {pressableStyles, textStyles} = getStyles(size, color, appearance);

  let content = [
    title !== undefined ? (
      <UltrasText key="text" style={[styles.text, ...textStyles]}>
        {title}
      </UltrasText>
    ) : null,
    icon !== undefined ? (
      <Icon key="icon" name={icon} size={stylesDictionary.iconSizes[size]} />
    ) : null,
  ];

  if (iconPosition === IconPositionEnum.Left) content = content.reverse();

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={[
        styles.button,
        pressableStyles,
        (isDisabled || isLoading) && styles.buttonDisabled,
      ]}>
      {isLoading ? <UltrasText>loader...</UltrasText> : content}
    </Pressable>
  );
};

export default React.memo<IButtonProps>(Button);
