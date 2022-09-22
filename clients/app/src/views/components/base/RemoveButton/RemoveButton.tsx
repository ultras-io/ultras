import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { RemoveButtonInterface } from './types';

const ORIGINAL_SIZE = 22;

const RemoveButton: React.FC<RemoveButtonInterface> = ({
  size = ORIGINAL_SIZE,
  onPress,
}) => {
  const svgContent = React.useMemo(() => {
    const iconScale = size / ORIGINAL_SIZE;

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(${iconScale} ${iconScale})">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z" fill="#ff3b30"/>
          <rect y="10.5" x="6" width="10" height="1" fill="#ffffff"/>
        </g>
      </svg>
    `;
  }, [size]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <SvgXml xml={svgContent} />
    </TouchableOpacity>
  );
};

export default RemoveButton;
