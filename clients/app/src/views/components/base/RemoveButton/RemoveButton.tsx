import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { buildSvg, ORIGINAL_SIZE } from './buildSvg';
import { IRemoveButtonProps } from './types';

const RemoveButton: React.FC<IRemoveButtonProps> = ({
  size = ORIGINAL_SIZE,
  onPress,
}) => {
  const svgContent = React.useMemo(() => buildSvg(size), [size]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <SvgXml xml={svgContent} />
    </TouchableOpacity>
  );
};

export default RemoveButton;
