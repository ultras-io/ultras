import React from 'react';
import {SvgXml} from 'react-native-svg';
import {withTheme} from 'styled-components/native';

import icons from '../../../../assets/icons';
// import icons from 'assets/icons';

import {IIconProps} from './type';

const Icon: React.FC<IIconProps> = ({theme, name, color, size = 24}) => {
  let iconName = icons[name];
  if (color) {
    iconName = iconName.replace(/fill=".+?"/, 'fill=' + theme?.colors[color]);
  }

  return <SvgXml xml={iconName} width={size} height={size} />;
};

export default React.memo<IIconProps>(withTheme(Icon));
