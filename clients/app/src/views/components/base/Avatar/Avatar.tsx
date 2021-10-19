import React from 'react';
import {View, Image} from 'react-native';

import defaultAvatar from 'assets/icons/avatar.jpeg';

import {IAvatarProps, SizeEnum} from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [SizeEnum.Small]: styles.small,
    [SizeEnum.Default]: styles.default,
    [SizeEnum.Big]: styles.big,
  },
};

const Avatar: React.FC<IAvatarProps> = ({
  avatarUri,
  size = SizeEnum.Default,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={avatarUri ? {uri: avatarUri} : defaultAvatar}
        style={stylesDictionary.sizes[size]}
      />
    </View>
  );
};

export default React.memo<IAvatarProps>(Avatar);
