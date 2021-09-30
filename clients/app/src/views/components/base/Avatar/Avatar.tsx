import React from 'react';
import {View, Image} from 'react-native';

import {IAvatarProps, Size} from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [Size.Small]: styles.small,
    [Size.Default]: styles.default,
    [Size.Big]: styles.big,
  },
};

const Avatar: React.FC<IAvatarProps> = ({uri, size = Size.Default}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={stylesDictionary.sizes[size]} />
    </View>
  );
};

export default React.memo<IAvatarProps>(Avatar);
