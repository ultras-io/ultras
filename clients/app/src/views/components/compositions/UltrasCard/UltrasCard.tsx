import React from 'react';
import {View} from 'react-native';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';

import {IUltrasCardProps} from './types';

import styles from './styles';

const UltrasCard: React.FC<IUltrasCardProps> = ({
  avatarUri,
  name,
  userName,
}) => {
  return (
    <BluredView style={styles.container}>
      <View style={styles.avatar}>
        <Avatar avatarUri={avatarUri} size={AvatarSize.Default} />
      </View>
      <View style={styles.info}>
        <UltrasText color="text" style={styles.userName}>
          {userName}
        </UltrasText>
        <UltrasText color="text" style={styles.name}>
          {name}
        </UltrasText>
      </View>
    </BluredView>
  );
};

export default React.memo<IUltrasCardProps>(UltrasCard);
