import React from 'react';
import {View, Image} from 'react-native';

import {IAvatarProps, SizeEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [SizeEnum.Small]: styles.small,
    [SizeEnum.Default]: styles.default,
    [SizeEnum.Big]: styles.big,
  },
};

const Avatar: React.FC<IAvatarProps> = ({uri, size = SizeEnum.Default}) => {
  return (
    <View style={styles.container}>
      <Image
        source={uri ? {uri} : require('../../../../assets/icons/avatar.jpeg')}
        style={stylesDictionary.sizes[size]}
      />
    </View>
  );
};

export default React.memo<IAvatarProps>(Avatar);
