import React from 'react';
import { Box } from 'native-base';
import { useTheme } from 'themes';
import { IBgProps, IWithBgProps } from './types';

export const WithBg: React.FC<IWithBgProps> = ({ children, size = 'md' }) => {
  return (
    <Box h={'full'} overflow={'hidden'}>
      <Bg size={size} />
      {children}
    </Box>
  );
};

const Bg: React.FC<IBgProps> = ({ size }) => {
  const { colors } = useTheme();

  return (
    <>
      <Box
        w={'full'}
        position={'absolute'}
        style={{ transform: [{ rotateZ: '-12deg' }] }}
        opacity={'0.2'}
        mt={'20'}
      >
        <Box
          bg={{
            linearGradient: {
              colors: [colors.textQuaternaryInvert, colors.textSeptenaryInvert],
              start: [0.1, 0],
              end: [0.9, 0],
            },
          }}
          w={'120%'}
          h={'192'}
          ml={'-10%'}
        >
          <Box
            bg={{
              linearGradient: {
                colors: [colors.textPrimary, colors.textSeptenary],
                start: [0.1, 0],
                end: [0.9, 0],
              },
            }}
            w={'120%'}
            h={'156'}
            ml={'-10%'}
            mt={'26'}
          >
            <Box
              bg={colors.textSenaryInvert}
              w={'120%'}
              h={'116'}
              ml={'-10%'}
              mt={'121'}
            />
          </Box>
        </Box>
        <Box bg={colors.textAction} opacity={0.5} h={'31'} ml={'88'} mt={'-6'} />
        <Box bg={colors.textPrimary} h={'4'} ml={'237'} mt={'4'} />
      </Box>
      {size === 'lg' && (
        <Box
          w={'full'}
          position={'absolute'}
          style={{ transform: [{ rotateZ: '-12deg' }] }}
          opacity={'0.2'}
          mt={'537'}
        >
          <Box bg={colors.textAction} opacity={0.5} w={'full'} h={'31'} ml={'88'} />
          <Box bg={colors.textPrimary} w={'full'} h={'4'} ml={'237'} mt={'4'} />
        </Box>
      )}
    </>
  );
};
