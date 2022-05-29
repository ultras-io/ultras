import React from 'react';
import { Pressable, Image } from 'react-native';
import Box from 'views/components/base/Box';

import defaultAvatar from 'assets/icons/avatar.png';

import { IAvatarProps, SizeEnum } from './types';
import styles from './styles';

const stylesDictionary = {
  sizes: {
    [SizeEnum.Small]: styles.small,
    [SizeEnum.Default]: styles.default,
    [SizeEnum.Big]: styles.big,
    [SizeEnum.ExtraBig]: styles.extraBig,
  },
};

const Avatar: React.FC<IAvatarProps> = ({
  onPress,
  avatarUri,
  size = SizeEnum.Default,
  isTeam = false,
}) => {
  const content = isTeam ? (
    <Box
      style={[styles.container, stylesDictionary.sizes[size]]}
      bgColor="backgroundLogo"
    >
      <Image
        source={avatarUri ? { uri: avatarUri } : defaultAvatar}
        style={[styles.image]}
      />
    </Box>
  ) : (
    <Box style={styles.container}>
      <Image
        source={avatarUri ? { uri: avatarUri } : defaultAvatar}
        style={stylesDictionary.sizes[size]}
      />
    </Box>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
};

export default React.memo<IAvatarProps>(Avatar);
