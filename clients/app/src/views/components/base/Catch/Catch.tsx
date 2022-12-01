import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import UltrasText from 'views/components/base/UltrasText';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { ICatchProps } from './type';
import styles from './styles';

const Catch: React.FC<ICatchProps> = ({
  isCaught = false,
  count = 0,
  iconSize = 'ic-md',
  onPress = undefined,
}) => {
  return (
    <Pressable onPress={preventMultiCalls(onPress)} style={styles.container}>
      <Icon
        name={isCaught ? Icons.Caught : Icons.Catch}
        color={isCaught ? 'textAction' : 'buttonAction'}
        size={iconSize}
      />

      {count > 0 && (
        <UltrasText style={styles.count} color="textPrimary">
          {getReadableNumber(count)}
        </UltrasText>
      )}
    </Pressable>
  );
};

export default React.memo<ICatchProps>(Catch);
