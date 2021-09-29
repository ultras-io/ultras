import React from 'react';
import {View, Text} from 'react-native';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {IBadgeProps, Size, Color} from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [Size.Small]: {
      bagde: styles.badgeSmall,
      number: styles.numberSmall,
    },
    [Size.Default]: {
      bagde: styles.badgeDefault,
      number: styles.numberDefault,
    },
    [Size.Big]: {
      bagde: styles.badgeBig,
      number: styles.numberBig,
    },
  },
  colors: {
    [Color.Default]: {
      bagde: styles.badgeColorDefault,
      number: styles.numberColorDefault,
    },
    [Color.Danger]: {
      bagde: styles.badgeColorDanger,
      number: styles.numberColorDanger,
    },
    [Color.Primary]: {
      bagde: styles.badgeColorPrimary,
      number: styles.numberColorPrimary,
    },
    [Color.Secondary]: {
      bagde: styles.badgeColorSecondary,
      number: styles.numberColorDeSecondary,
    },
  },
};

const getStyles = (size: Size, color: Color) => {
  return {
    bagdeStyles: [
      stylesDictionary.sizes[size].bagde,
      stylesDictionary.colors[color].bagde,
    ],
    numberStyles: [
      stylesDictionary.sizes[size].number,
      stylesDictionary.colors[color].number,
    ],
  };
};

const Badge: React.FC<IBadgeProps> = ({
  number,
  size = Size.Default,
  color = Color.Default,
}) => {
  const {bagdeStyles, numberStyles} = getStyles(size, color);

  return (
    <View style={[styles.container, bagdeStyles]}>
      <Text style={[styles.number, numberStyles]}>
        {getReadableNumber(number)}
      </Text>
    </View>
  );
};

export default Badge;
