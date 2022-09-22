import React from 'react';
import { Box } from 'native-base';
import { useTheme } from 'themes';
import { IFormControlProps } from './types';

const FormControl: React.FC<IFormControlProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Box bgColor={colors.backgroundInput} rounded={'lg'} overflow={'hidden'}>
      {children}
    </Box>
  );
};

export default FormControl;
