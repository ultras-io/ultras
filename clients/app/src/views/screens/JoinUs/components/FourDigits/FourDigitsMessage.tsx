import React from 'react';
import { VStack, HStack, Text, Pressable } from 'native-base';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import type { IState } from 'stores/registration';
import type { IFourDigitsMessageProps } from '../../types';

const cycle = 60;

const FourDigitsMessage: React.FC<IFourDigitsMessageProps> = ({ useStore }) => {
  const status = useStore((state: IState) => state.status);
  const confirmIdentity = useStore((state: IState) => state.confirmIdentity);

  const [time, setTime] = React.useState(0);
  const intervalRef = React.useRef();

  React.useEffect(() => {
    setTime(cycle);
    return () => clearInterval(intervalRef.current);
  }, []);

  React.useLayoutEffect(() => {
    if (time === cycle)
      intervalRef.current = setInterval(() => setTime(t => t - 1), 1000);
    else if (time === 0) clearInterval(intervalRef.current);
  }, [time]);

  React.useLayoutEffect(() => {
    if (status === 'success') setTime(cycle);
  }, [status]);

  return (
    <VStack justifyContent={'flex-end'} mr={'2'} mt={'1.5'}>
      <HStack space={'1'} justifyContent={'flex-end'} alignItems={'center'}>
        <Icon name={Icons.Warning} color={'textAction'} size={'ic-2xs'} />
        <Text variant={'smallText'} textAlign={'right'}>
          {I18n.t('joinUsFourDigitsCodeNotRecieved')}
        </Text>
      </HStack>
      <Pressable
        onPress={() => confirmIdentity()}
        disabled={time > 0 || status === 'loading'}
      >
        <Text variant={'smallTextAction'} textAlign={'right'}>
          {I18n.t('joinUsFourDigitsRequestAgain') + (time > 0 ? ' (' + time + ')' : '')}
        </Text>
      </Pressable>
    </VStack>
  );
};

export default React.memo<IFourDigitsMessageProps>(FourDigitsMessage);
