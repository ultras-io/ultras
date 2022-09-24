import React from 'react';
import { VStack, Divider, Text } from 'native-base';
import { useTheme } from 'themes';
import { InputSection } from 'views/components/base/InputSection';
import { IKeyValueGroupProps } from './types';

export const KeyValueGroup: React.FC<IKeyValueGroupProps> = ({
  children,
  description,
}) => {
  const { colors } = useTheme();

  return (
    <VStack>
      <InputSection>
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
      </InputSection>

      {description && (
        <Text variant={'cardStats'} p={'2'}>
          {description}
        </Text>
      )}
    </VStack>
  );
};
