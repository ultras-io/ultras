import React from 'react';
import {Image} from 'react-native';
import Box from 'views/components/base/Box';

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
  isTeam = false,
}) => {
  return isTeam ? (
    <Box
      style={[styles.container, stylesDictionary.sizes[size]]}
      bgColor="bgColorLight">
      <Image
        source={avatarUri ? {uri: avatarUri} : defaultAvatar}
        style={[styles.image]}
      />
    </Box>
  ) : (
    <Box style={styles.container}>
      <Image
        source={avatarUri ? {uri: avatarUri} : defaultAvatar}
        style={stylesDictionary.sizes[size]}
      />
    </Box>
  );
};

export default React.memo<IAvatarProps>(Avatar);
