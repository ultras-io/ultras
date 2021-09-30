import React from 'react';
import {Pressable, Text} from 'react-native';

import Icon from '../Icon';

import {IButtonProps, Size, Color, Appearance, IconPosition} from './types';

import styles from './styles';

const stylesDictionary = {
  sizes: {
    [Size.Small]: {
      pressable: styles.buttonSizeSmall,
      text: styles.textSizeSmall,
    },
    [Size.Default]: {
      pressable: styles.buttonSizeDefault,
      text: styles.textSizeDefault,
    },
    [Size.Big]: {
      pressable: styles.buttonSizeBig,
      text: styles.textSizeBig,
    },
  },
  colors: {
    [Color.Primary]: {
      pressable: styles.buttonColorPrimary,
      text: styles.textColorPrimary,
    },
    [Color.Secondary]: {
      pressable: styles.buttonColorSecondary,
      text: styles.textColorSecondary,
    },
    [Color.Default]: {
      pressable: styles.buttonColorDefault,
      text: styles.textColorDefault,
    },
    [Color.Danger]: {
      pressable: styles.buttonColorDanger,
      text: styles.textColorDanger,
    },
  },
  appearances: {
    [Appearance.Minimal]: {
      pressable: styles.buttonAppearanceMinimal,
      text: styles.textAppearanceMinimal,
    },
    [Appearance.Outline]: {
      pressable: styles.buttonAppearanceOutline,
      text: styles.textAppearanceOutline,
    },
    [Appearance.Default]: {
      pressable: styles.buttonAppearanceDefault,
      text: styles.textAppearanceDefault,
    },
  },
  iconSizes: {
    [Size.Small]: 10,
    [Size.Default]: 12,
    [Size.Big]: 24,
  },
};

const getStyles = (size: Size, color: Color, appearance: Appearance) => {
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
  size = Size.Default,
  color = Color.Default,
  appearance = Appearance.Default,
  icon,
  iconPosition = IconPosition.Right,
  isLoading = false,
  isDisabled = false,
}) => {
  const {pressableStyles, textStyles} = getStyles(size, color, appearance);

  let content = [
    title !== undefined ? (
      <Text style={[styles.text, textStyles]}>{title}</Text>
    ) : null,
    icon !== undefined ? (
      <Icon name={icon} size={stylesDictionary.iconSizes[size]} />
    ) : null,
  ];

  if (iconPosition === IconPosition.Left) content = content.reverse();

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={[
        styles.button,
        pressableStyles,
        (isDisabled || isLoading) && styles.buttonDisabled,
      ]}>
      {isLoading ? <Text>loader...</Text> : content}
    </Pressable>
  );
};

export default Button;
