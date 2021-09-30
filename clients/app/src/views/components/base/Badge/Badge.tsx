import React from 'react';
import {View, Text} from 'react-native';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {IBadgeProps, SizeEnum, ColorEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [SizeEnum.Small]: {
      bagde: styles.badgeSmall,
      number: styles.numberSmall,
    },
    [SizeEnum.Default]: {
      bagde: styles.badgeDefault,
      number: styles.numberDefault,
    },
    [SizeEnum.Big]: {
      bagde: styles.badgeBig,
      number: styles.numberBig,
    },
  },
  colors: {
    [ColorEnum.Default]: {
      bagde: styles.badgeColorDefault,
      number: styles.numberColorDefault,
    },
    [ColorEnum.Danger]: {
      bagde: styles.badgeColorDanger,
      number: styles.numberColorDanger,
    },
    [ColorEnum.Primary]: {
      bagde: styles.badgeColorPrimary,
      number: styles.numberColorPrimary,
    },
    [ColorEnum.Secondary]: {
      bagde: styles.badgeColorSecondary,
      number: styles.numberColorDeSecondary,
    },
  },
};

const getStyles = (size: SizeEnum, color: ColorEnum) => {
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
  size = SizeEnum.Default,
  color = ColorEnum.Default,
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

export default React.memo<IBadgeProps>(Badge);
