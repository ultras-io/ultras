import React, {useCallback} from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import UltrasText from 'views/components/base/UltrasText';
import Button from 'views/components/base/Button';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import {IEventProps} from './types';
import styles from './styles';

const Event: React.FC<IEventProps> = ({route}) => {
  const {tabName} = route.params;
  const {pushTo} = useNavigationWithParams();

  const navigateToMatch = useCallback(() => {
    pushTo(commonScreens.match);
  }, [pushTo]);

  return (
    <WithSafeArea>
      <UltrasText style={styles.text}>Single Event</UltrasText>
      <UltrasText>tab: {tabName}</UltrasText>
      <Button title="Push Single Match" onPress={navigateToMatch} />
    </WithSafeArea>
  );
};

export default Event;
