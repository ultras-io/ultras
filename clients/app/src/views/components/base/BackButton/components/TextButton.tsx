import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { TextButtonProps } from '../types';

const TextButton: React.FC<TextButtonProps> = ({ action, color, fontSize }) => {
  const { colors } = useTheme();

  const text = React.useMemo(() => {
    const texts: Record<string, string> = {
      close: I18n.t('common-close'),
      // @NOTE: add another texts here
    };

    return texts[action] || null;
  }, [action]);

  if (!text) {
    return null;
  }

  return (
    <Text color={colors[color!]} fontSize={fontSize || 'xl'}>
      {text}
    </Text>
  );
};

export default TextButton;
