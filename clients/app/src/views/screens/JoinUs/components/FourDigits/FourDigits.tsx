import React from 'react';
import { Keyboard } from 'react-native';
import {
  VStack,
  HStack,
  Center,
  Box,
  Text,
  Input,
  Pressable,
  Skeleton,
} from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import FourDigitsMessage from './FourDigitsMessage';
import type { IState } from 'stores/registration';
import type { IFourDigitsProps } from '../../types';

const FourDigits: React.FC<IFourDigitsProps> = ({ useStore }) => {
  const status = useStore((state: IState) => state.status);
  const statusNext = useStore((state: IState) => state.statusNext);
  const isCodeValid = useStore((state: IState) => state.user.isCodeValid);
  const userexists = useStore((state: IState) => state.user.exists);
  const verifyCode = useStore((state: IState) => state.verifyCode);
  const nextStep = useStore((state: IState) => state.nextStep);

  const { colors } = useTheme();
  const inputRef = React.useRef(null);
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    if (code.length === 4) {
      verifyCode(code);
    }
  }, [code, verifyCode]);

  React.useLayoutEffect(() => {
    if (statusNext === 'success') {
      Keyboard.dismiss();
      if (isCodeValid) {
        if (userexists) {
          // login
        } else {
          nextStep();
        }
      }
    }
  }, [statusNext, isCodeValid, userexists, nextStep]);

  const digitProps = {
    w: 46,
    h: 57,
    bg: colors.backgroundInputInvert,
    borderWidth: 1,
    _text: {
      color: colors.textPrimaryInvert,
      fontSize: 36,
      fontWeight: '600',
    },
    rounded: 'xl',
  };

  const onPress = React.useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onChangeText = React.useCallback(
    text => {
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
    <Box alignSelf="flex-end" mr={5} my={2}>
      <VStack bg={colors.backgroundCardInvert} p={'4'} rounded={'xl'}>
        <Text variant={'matchTimeInvert'} mb={'2'}>
          {I18n.t('joinUsFourDigitsCode')}
        </Text>
        <Pressable onPress={onPress}>
          {status === 'loading' || statusNext === 'loading' ? (
            <DigitsLoader color={colors.textPrimary} />
          ) : (
            <HStack space={'2'}>
              {[0, 1, 2, 3].map(i => (
                <Center
                  key={i}
                  {...digitProps}
                  borderColor={
                    code.length === i
                      ? colors.iconVerified
                      : colors.backgroundDividerTransparent
                  }
                >
                  {code[i] || ''}
                </Center>
              ))}
            </HStack>
          )}
          <Input
            ref={inputRef}
            keyboardType={'number-pad'}
            onChangeText={onChangeText}
            value={'-'}
            h={0}
            w={0}
            _text={{
              color: 'coral',
            }}
          />
        </Pressable>
      </VStack>

      <FourDigitsMessage useStore={useStore} />
    </Box>
  );
};

export default React.memo<IFourDigitsProps>(FourDigits);

const DigitsLoader = ({ color }: { color: string }) => (
  <HStack space={'2'}>
    {[0, 1, 2, 3].map(i => (
      <Skeleton
        key={'DigitsLoader' + i}
        w={46}
        h={57}
        rounded={'xl'}
        startColor={color}
      />
    ))}
  </HStack>
);
