import React from 'react';
import { VStack, Box, Text } from 'native-base';
import { useTheme } from 'themes';
import { IMessageBoxProps } from './types';

const MessageBox: React.FC<IMessageBoxProps> = ({
  children,
  side = 'left',
  denied = false,
  bottomText,
}) => {
  const { colors } = useTheme();

  let bg = colors.backgroundMessageWarning;
  if (!denied)
    bg =
      side === 'left' ? colors.backgroundMessageReceived : colors.backgroundMessageSent;

  return (
    <VStack marginX={'5'} marginY={'2'} space={'1'}>
      <Box
        bg={bg}
        _text={{
          color: side === 'left' ? colors.textTertiaryInvert : colors.textPrimary,
          fontSize: '4xl',
          letterSpacing: '-0.408',
        }}
        paddingY={'2.5'}
        paddingX={'3'}
        maxW={'85%'}
        alignSelf={side === 'left' ? 'flex-start' : 'flex-end'}
        borderRadius={'xl'}
        borderBottomLeftRadius={side === 'left' ? 0 : 'xl'}
        borderBottomRightRadius={side === 'left' ? 'xl' : 0}
        borderWidth={1}
        borderColor={
          side === 'left' ? colors.backgroundMessageSent : colors.backgroundInput
        }
      >
        {children}
      </Box>
      {denied && (
        <Text
          variant={'smallText'}
          textAlign={'right'}
          maxW={'95%'}
          alignSelf={side === 'left' ? 'flex-start' : 'flex-end'}
        >
          {bottomText}
        </Text>
      )}
    </VStack>
  );
};

export default React.memo<IMessageBoxProps>(MessageBox);
