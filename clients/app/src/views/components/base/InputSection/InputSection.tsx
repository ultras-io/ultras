import React from 'react';
import { Box } from 'native-base';
import { useTheme } from 'themes';
import { IInputSectionProps } from './types';

const InputSection: React.FC<IInputSectionProps> = ({ children, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Box {...rest} bgColor={colors.backgroundInput} rounded={'lg'} overflow={'hidden'}>
      {children}
    </Box>
  );
};

export default InputSection;
