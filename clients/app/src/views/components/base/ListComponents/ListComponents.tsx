import React from 'react';
import { Box, Center, Text, Spinner } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';

export const NoResults: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Box
      borderBottomWidth={'0.5'}
      borderBottomColor={colors.backgroundDividerTransparent}
    >
      <Text variant={'info'} paddingY={'4'} ml={2}>
        {I18n.t('common-noResults')}
      </Text>
    </Box>
  );
};

export const Loader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Center w={'full'} margin={3}>
      <Spinner color={colors.iconNavigation} />
    </Center>
  );
};
