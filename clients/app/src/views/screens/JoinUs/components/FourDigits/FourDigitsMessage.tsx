import React from 'react';
import { VStack, HStack, Text, Pressable } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import type { IState } from 'stores/registration';
import type { IFourDigitsMessageProps } from '../../types';

const cycle = 60;

const FourDigitsMessage: React.FC<IFourDigitsMessageProps> = ({ useStore }) => {
  const status = useStore((state: IState) => state.status);
  const statusNext = useStore((state: IState) => state.statusNext);
  const isCodeValid = useStore((state: IState) => state.user.isCodeValid);
  const confirmIdentity = useStore((state: IState) => state.confirmIdentity);

  const [time, setTime] = React.useState(0);
  const intervalRef = React.useRef();

  const showError = !isCodeValid && statusNext === 'success';

  React.useLayoutEffect(() => {
    if (!intervalRef.current) setTime(cycle);
    return () => clearInterval(intervalRef.current);
  }, []);

  React.useLayoutEffect(() => {
    if (time === 0) clearInterval(intervalRef.current);
    else if (time === cycle && !intervalRef.current) {
      intervalRef.current = setInterval(() => setTime(t => t - 1), 1000);
    }
  }, [time]);

  React.useLayoutEffect(() => {
    if (status === 'success' && !intervalRef.current) setTime(cycle);
  }, [status]);

  return (
    <VStack justifyContent={'flex-end'} mr={'2'} mt={'1.5'}>
      <HStack space={'1'} justifyContent={'flex-end'} alignItems={'center'}>
        {showError && <Icon name={Icons.Warning} color={'textAction'} size={'ic-2xs'} />}
        <Text variant={'smallText'} textAlign={'right'}>
          {showError
            ? I18n.t('joinUs-fourDigitsCodeWrong')
            : I18n.t('joinUs-fourDigitsCodeNotReceived')}
        </Text>
      </HStack>
      <Pressable
        onPress={() => confirmIdentity()}
        disabled={time > 0 || status === 'loading' || statusNext === 'loading'}
      >
        <Text variant={'smallTextAction'} textAlign={'right'}>
          {I18n.t('joinUs-fourDigitsRequestAgain') + (time > 0 ? ' (' + time + ')' : '')}
        </Text>
      </Pressable>
    </VStack>
  );
};

export default React.memo<IFourDigitsMessageProps>(FourDigitsMessage);
