import React from 'react';
import { View, Pressable } from 'react-native';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';

import { IProfileCardProps } from './types';

import styles from './styles';

const ProfileCard: React.FC<IProfileCardProps> = ({
  avatarUri,
  name,
  username,
  onPress,
  appearance,
}) => {
  const Container = appearance === 'minimal' ? View : BluredView;

  return (
    <Pressable onPress={onPress}>
      <Container
        style={appearance === 'minimal' ? styles.containerMinimal : styles.container}
      >
        <View style={styles.avatar}>
          {/* <Avatar avatarUri={avatarUri} size={AvatarSize.Default} /> */}
        </View>
        <View style={styles.info}>
          <UltrasText color="textPrimary" style={styles.username} numberOfLines={1}>
            {username}
          </UltrasText>
          <UltrasText color="textPrimary" style={styles.name} numberOfLines={1}>
            {name}
          </UltrasText>
        </View>
      </Container>
    </Pressable>
  );
};

export default React.memo<IProfileCardProps>(ProfileCard);
