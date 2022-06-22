import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import UltrasText from 'views/components/base/UltrasText';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { ILikeProps } from './type';
import styles from './styles';

const Like: React.FC<ILikeProps> = ({ isLiked = false, count = 0, onPress }) => {
  return (
    <Pressable onPress={preventMultiCalls(() => onPress())} style={styles.container}>
      <Icon
        name={isLiked ? Icons.Liked : Icons.Like}
        color={isLiked ? 'buttonAction' : 'buttonActionInvert'}
      />

      {count > 0 && (
        <UltrasText style={styles.count} color="textPrimary">
          {getReadableNumber(count)}
        </UltrasText>
      )}
    </Pressable>
  );
};

export default React.memo<ILikeProps>(Like);
