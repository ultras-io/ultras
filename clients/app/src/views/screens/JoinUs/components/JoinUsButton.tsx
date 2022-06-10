import React from 'react';
import { Box, Button } from 'native-base';
import type { IJoinUsButtonProps } from '../types';

const JoinUsButton: React.FC<IJoinUsButtonProps> = ({ onPress, text }) => {
  return (
    <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
      <Button onPress={onPress} variant={'primary'}>
        {text}
      </Button>
    </Box>
  );
};

export default React.memo<IJoinUsButtonProps>(JoinUsButton);
