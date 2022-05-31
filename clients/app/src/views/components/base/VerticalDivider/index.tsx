import React from 'react';
import { Center, Divider } from 'native-base';
import { useTheme } from 'themes';

export default () => {
  const { colors } = useTheme();

  return (
    <Center>
      <Divider
        orientation="vertical"
        mx={2}
        height={'dv-sm'}
        bg={colors.backgroundDividerTransparent}
      />
    </Center>
  );
};
