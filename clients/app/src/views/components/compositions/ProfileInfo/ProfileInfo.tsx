import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';

import {IProfileInfoProps} from './types';
import styles from './styles';

const ProfileInfo: React.FC<IProfileInfoProps> = ({
  avatarUri,
  name,
  username,
  teams,
  supportersClubs,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={avatarUri} size={AvatarSize.Big} />
        </View>
        <View style={styles.info}>
          <UltrasText color="tertiary" style={styles.name}>
            {name}
          </UltrasText>
          <UltrasText
            color="tertiaryText"
            style={styles.username}
            numberOfLines={1}>
            {username}
          </UltrasText>
        </View>
      </View>
    </>
  );
};

export default React.memo<IProfileInfoProps>(ProfileInfo);
