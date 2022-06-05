import React from 'react';
import { Box } from 'native-base';
import { useTheme } from 'themes';

const Loader = () => {
  const { colors } = useTheme();
  return <Box flex={1} bgColor={colors.backgroundMain} />;
};

export default Loader;
