import React from 'react';
import { View, Pressable, Avatar } from 'native-base';
import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import { IProfileCardProps } from './types';
import styles from './styles';

const ProfileCard: React.FC<IProfileCardProps> = ({
  avatar,
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
          <Avatar source={{ uri: avatar }} size={'av-sm'} />
        </View>
        <View style={styles.info}>
          <UltrasText color="textPrimary" style={styles.username} numberOfLines={1}>
            {username}
          </UltrasText>

          {name && (
            <UltrasText color="textPrimary" style={styles.name} numberOfLines={1}>
              {name}
            </UltrasText>
          )}
        </View>
      </Container>
    </Pressable>
  );
};

export default React.memo<IProfileCardProps>(ProfileCard);
