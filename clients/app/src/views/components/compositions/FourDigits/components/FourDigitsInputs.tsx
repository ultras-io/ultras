import React from 'react';
import { VStack, HStack, Center, Text, Input, Pressable, Skeleton } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import type { IFourDigitsInputsProps, IFourDigitsLoaderProps } from '../types';

const FourDigitsInputs: React.FC<IFourDigitsInputsProps> = ({
  colorMode,
  isLoading,
  verifyCode,
}) => {
  const { colors } = useTheme();

  const refInput = React.useRef<null | any>(null);
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    if (code.length === 4) {
      verifyCode(code);
    }
  }, [code, verifyCode]);

  const onPress = React.useCallback(() => {
    refInput.current?.focus();
  }, [refInput]);

  const onChangeText = React.useCallback(
    (text: string) => {
      const digit = text[1];
      if (!digit) {
        setCode(code.slice(0, -1));
      } else if (digit >= '0' && digit <= '9') {
        if (code.length < 4) {
          setCode(code + digit);
        }
      }
    },
    [code]
  );

  return (
    <VStack
      backgroundColor={
        colorMode === 'light' ? colors.backgroundCardInvert : colors.backgroundCard
      }
      padding={4}
      rounded={'xl'}
    >
      <Text
        marginBottom={2}
        fontSize={'sm'}
        fontWeight={600}
        color={colorMode === 'light' ? colors.textPrimaryInvert : colors.textPrimary}
      >
        {I18n.t('fourDigits-code')}
      </Text>

      <Pressable onPress={onPress}>
        {isLoading ? (
          <FourDigitsInputsLoader colorMode={colorMode} />
        ) : (
          <HStack space={'2'}>
            {[0, 1, 2, 3].map(i => (
              <Center
                key={`FourDigitInput-${i}`}
                width={46}
                height={57}
                backgroundColor={
                  colorMode === 'light'
                    ? colors.backgroundInputInvert
                    : colors.backgroundInput
                }
                borderWidth={1}
                rounded={'xl'}
                borderColor={
                  code.length === i
                    ? colors.iconVerified
                    : colors.backgroundDividerTransparent
                }
                _text={{
                  color:
                    colorMode === 'light' ? colors.textPrimaryInvert : colors.textPrimary,
                  fontSize: 36,
                  fontWeight: 600,
                }}
              >
                {code[i] || ''}
              </Center>
            ))}
          </HStack>
        )}

        <Input
          ref={refInput}
          keyboardType={'number-pad'}
          onChangeText={onChangeText}
          value={'-'}
          height={0}
          width={0}
        />
      </Pressable>
    </VStack>
  );
};

export default FourDigitsInputs;

const FourDigitsInputsLoader: React.FC<IFourDigitsLoaderProps> = ({ colorMode }) => {
  const { colors } = useTheme();

  const [colorStart, colorEnd] = React.useMemo(() => {
    if (colorMode === 'light') {
      return [colors.textPrimary, colors.textSeptenary];
    }

    return [colors.textSenaryInvert, colors.textSeptenaryInvert];
  }, [colorMode, colors]);

  return (
    <HStack space={'2'}>
      {[0, 1, 2, 3].map(i => (
        <Skeleton
          key={'DigitsLoader' + i}
          w={46}
          h={57}
          rounded={'xl'}
          startColor={colorStart}
          endColor={colorEnd}
        />
      ))}
    </HStack>
  );
};
