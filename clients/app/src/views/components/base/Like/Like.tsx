import React from 'react';
import {Pressable} from 'react-native';

import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from '../../../../assets/icons';
// import {IconNamesEnum as Icons} from 'assets/icons';

import {ILikeProps} from './type';
import styles from './styles';

const Like: React.FC<ILikeProps> = ({isLiked = false, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon
        name={isLiked ? Icons.Liked : Icons.Like}
        color={isLiked ? 'primary' : undefined}
        size={24}
      />
    </Pressable>
  );
};

export default React.memo<ILikeProps>(Like);
