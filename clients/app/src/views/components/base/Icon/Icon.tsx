import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'themes';

import icons from 'assets/icons';

import { IIconProps } from './type';

const Icon: React.FC<IIconProps> = ({ name, color, size = 24 }) => {
  const { colors } = useTheme();

  let iconName = icons[name];
  if (color) {
    iconName = iconName.replace(/fill=".+?"/, 'fill="' + colors[color] + '"');
  }

  return <SvgXml xml={iconName} width={size} height={size} />;
};

export default React.memo<IIconProps>(Icon);
