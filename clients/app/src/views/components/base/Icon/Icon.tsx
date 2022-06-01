import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'themes';
import { Icon as NBIcon } from 'native-base';
import icons from 'assets/icons';
import { IIconProps } from './type';

const Icon: React.FC<IIconProps> = ({ name, color = 'iconSecondary', ...props }) => {
  const { colors } = useTheme();

  return (
    <NBIcon color={colors[color]} viewBox={icons[name].viewBox} {...props}>
      <SvgXml xml={icons[name].content} />
    </NBIcon>
  );
};

export default React.memo<IIconProps>(Icon);
