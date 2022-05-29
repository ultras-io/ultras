import React from 'react';
import { Pressable, View } from 'react-native';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
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
    case SizeEnum.ExtraBig:
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
    case SizeEnum.ExtraBig:
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
      return 18;
    case SizeEnum.ExtraBig:
      return 26;
    default:
      return 12;
  }
};

const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  size = SizeEnum.Default,
  color = 'textPrimary',
  bgColor = 'buttonPrimary',
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
        color={color}
      >
        {title}
      </UltrasText>
    ) : null,
    icon !== undefined ? (
      <View key="icon" style={styles.icon}>
        <Icon name={icon} size={getIconSize(size)} color={color} />
      </View>
    ) : null,
  ];

  if (iconPosition === IconPositionEnum.Left) content = content.reverse();

  const _bgColor = React.useMemo(() => {
    if (
      appearance === AppearanceEnum.Minimal ||
      appearance === AppearanceEnum.UnderLined ||
      appearance === AppearanceEnum.Outline
    )
      return 'transparent';
    return bgColor ? bgColor : 'transparent';
  }, [appearance, bgColor]);

  const _borderColor = React.useMemo(() => {
    if (appearance === AppearanceEnum.Minimal || appearance === AppearanceEnum.UnderLined)
      return 'transparent';
    return bgColor ? bgColor : 'transparent';
  }, [appearance, bgColor]);

  return (
    <Pressable onPress={onPress} disabled={isDisabled || isLoading}>
      <Box
        bgColor={_bgColor}
        borderColor={_borderColor}
        style={[
          styles.button,
          (isDisabled || isLoading) && styles.buttonDisabled,
          pressableSize,
          pressableBoxSize,
          appearance === AppearanceEnum.Minimal && styles.noPadding,
        ]}
      >
        {isLoading ? <UltrasText>loader...</UltrasText> : content}
      </Box>
    </Pressable>
  );
};

export default React.memo<IButtonProps>(Button);
