import React from 'react';
import { Icons } from 'assets/icons';
import Icon from 'views/components/base/Icon';
import { IconButtonProps } from '../types';

const IconButton: React.FC<IconButtonProps> = ({ action, color, iconSize }) => {
  const icon = React.useMemo(() => {
    const icons: Record<string, Icons> = {
      back: Icons.Back,
      close: Icons.Back,
      // @NOTE: add another icons here
    };

    return icons[action] || null;
  }, [action]);

  if (!icon) {
    return null;
  }

  return <Icon name={icon} color={color} size={iconSize || 'sm'} />;
};

export default IconButton;
