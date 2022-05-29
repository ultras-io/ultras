import React, { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Text } from 'native-base';
import { useTheme } from 'themes';
import { IUltrasTextProps } from './types';

const UltrasText: React.FC<IUltrasTextProps> = ({
  children,
  style,
  color,
  numberOfLines,
}) => {
  const { colors, theming } = useTheme();

  const [textStyle, fontFamily, fontWeight, fontSize] = useMemo(() => {
    if (!style) {
      return [undefined, undefined, undefined, undefined];
    }

    let finalFontFamily: string | undefined;
    let finalFontWeight: string | undefined;
    let finalFontSize: number | undefined;

    const styleArray: Array<TextStyle> = !Array.isArray(style)
      ? [style as TextStyle]
      : (style as Array<TextStyle>);

    let finalTextStyle: TextStyle = {};
    styleArray.forEach(styleItem => {
      if (!styleItem) {
        return;
      }

      finalFontFamily = finalFontFamily || styleItem.fontFamily;
      finalFontWeight = finalFontWeight || styleItem.fontWeight;
      finalFontSize = finalFontSize || styleItem.fontSize;

      finalTextStyle = {
        ...finalTextStyle,
        ...(styleItem || {}),
      };
    });

    finalFontFamily = finalFontFamily || '';
    finalFontWeight = finalFontWeight || theming.fontWeights.normal.toString();
    finalFontSize = finalFontSize || theming.fontSizes['2xl'];

    finalTextStyle = {
      ...finalTextStyle,
      fontFamily: undefined,
    };

    return [finalTextStyle, finalFontFamily, finalFontWeight, finalFontSize];
  }, [style, theming]);

  return (
    <Text
      style={textStyle}
      color={color ? colors[color] : colors.textPrimary}
      adjustsFontSizeToFit={true}
      allowFontScaling={true}
      numberOfLines={numberOfLines}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      {children}
    </Text>
  );
};

export default React.memo<IUltrasTextProps>(UltrasText);
