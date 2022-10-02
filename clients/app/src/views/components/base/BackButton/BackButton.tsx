import React from 'react';
import { Box, Button } from 'native-base';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import IconButton from './components/IconButton';
import TextButton from './components/TextButton';
import { ButtonProps, IconButtonProps, TextButtonProps } from './types';

const BackButton: React.FC<ButtonProps> = ({
  type,
  position = 'left',
  onPress,
  ...props
}: ButtonProps) => {
  const { goBack } = useNavigationWithParams();
  const { colors } = useTheme();

  const onButtonPress = React.useCallback(() => {
    if (typeof onPress === 'function') {
      return onPress();
    }

    goBack();
  }, [goBack, onPress]);

  props.color = props.color || 'textAction';

  return (
    <Button
      variant={'empty'}
      alignSelf={position === 'left' ? 'flex-start' : 'flex-end'}
      marginTop={'5'}
      marginBottom={'2.5'}
      paddingX={'2.5'}
      onPress={onButtonPress}
      _text={{ color: colors[props.color] }}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        {['icon', 'both'].includes(type) && (
          <IconButton {...(props as IconButtonProps)} />
        )}
        {['text', 'both'].includes(type) && (
          <TextButton {...(props as TextButtonProps)} />
        )}
      </Box>
    </Button>
  );
};

export default BackButton;
