import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'native-base';

import { useTheme } from 'themes';
import { IBoxProps } from './types';

const Box: React.FC<IBoxProps> = ({ borderColor, bgColor, style, children }) => {
  const { colors } = useTheme();

  const finalStyle = useMemo((): StyleProp<ViewStyle> => {
    const overrideStyle = {
      borderColor: borderColor ? colors[borderColor] : colors.transparent,
      backgroundColor: bgColor ? colors[bgColor] : colors.transparent,
    };

    if (!style) {
      return overrideStyle;
    }

    if (Array.isArray(style)) {
      return [...style, overrideStyle];
    }

    return {
      ...(style as object),
      ...overrideStyle,
    };
  }, [borderColor, bgColor, style, colors]);

  return <View style={finalStyle}>{children}</View>;
};

export default Box;
