import React from 'react';
import { Box } from 'native-base';
import { useTheme } from 'themes';
import { IMessageBoxProps } from './types';

const MessageBox: React.FC<IMessageBoxProps> = ({ children, side = 'left' }) => {
  const { colors } = useTheme();
  return (
    <Box
      bg={
        side === 'left' ? colors.backgroundMessageReceived : colors.backgroundMessageSent
      }
      _text={{
        color: side === 'left' ? colors.textTertiaryInvert : colors.textPrimary,
        fontSize: '4xl',
        letterSpacing: '-0.408',
      }}
      marginX={'5'}
      marginY={'2'}
      paddingY={'2.5'}
      paddingX={'3'}
      maxW={'80%'}
      alignSelf={side === 'left' ? 'flex-start' : 'flex-end'}
      borderRadius={'xl'}
      borderBottomLeftRadius={side === 'left' ? 0 : 'xl'}
      borderBottomRightRadius={side === 'left' ? 'xl' : 0}
    >
      {children}
    </Box>
  );
};

export default React.memo<IMessageBoxProps>(MessageBox);
