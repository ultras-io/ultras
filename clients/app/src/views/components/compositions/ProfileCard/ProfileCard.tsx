import React from 'react';
import {View, Pressable} from 'react-native';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';

import {IProfileCardProps} from './types';

import styles from './styles';

const ProfileCard: React.FC<IProfileCardProps> = ({
  avatarUri,
  name,
  username,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={avatarUri} size={AvatarSize.Default} />
        </View>
        <View style={styles.info}>
          <UltrasText color="text" style={styles.username} numberOfLines={1}>
            {username}
          </UltrasText>
          <UltrasText color="text" style={styles.name} numberOfLines={1}>
            {name}
          </UltrasText>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IProfileCardProps>(ProfileCard);
