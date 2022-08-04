import React from 'react';
import { Box, Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { IAttacheImageProps } from './types';

const AttacheImage: React.FC<IAttacheImageProps> = ({ title }) => {
  const { colors } = useTheme();

  return (
    <Box bg={colors.backgroundInput} p={'4'} rounded={'xl'}>
      <Text variant={'smallText'}>{title}</Text>
      <Center bg={colors.buttonSecondaryDisabled} mt={'3'} rounded={'md'} h={'40'}>
        <Text variant={'smallText'}>{I18n.t('common-tapToAdd')}</Text>
      </Center>
    </Box>
  );
};

export default React.memo<IAttacheImageProps>(AttacheImage);
