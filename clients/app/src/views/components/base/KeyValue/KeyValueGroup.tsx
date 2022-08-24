import React from 'react';
import { VStack, Box, Divider, Text } from 'native-base';
import { useTheme } from 'themes';
import { IKeyValueGroupProps } from './types';

export const KeyValueGroup: React.FC<IKeyValueGroupProps> = ({
  children,
  description,
}) => {
  const { colors } = useTheme();

  return (
    <VStack>
      <Box bgColor={colors.backgroundInput} rounded={'lg'} overflow={'hidden'}>
        {children &&
          children
            .filter(child => child)
            .map((row, i) => (
              <React.Fragment key={'pair' + i}>
                {i !== 0 && (
                  <Divider
                    ml={'4'}
                    thickness={1}
                    bgColor={colors.backgroundDividerTransparent}
                  />
                )}
                {row}
              </React.Fragment>
            ))}
      </Box>

      {description && (
        <Text variant={'cardStats'} p={'2'}>
          {description}
        </Text>
      )}
    </VStack>
  );
};
