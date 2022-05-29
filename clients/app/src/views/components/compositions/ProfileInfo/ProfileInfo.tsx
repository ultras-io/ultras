import React from 'react';
import { View } from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';

import TeamsContainer from 'views/containers/TeamsHorizontal/TeamsContainer';
import FanClubsContainer from 'views/containers/FanClubsHorizontal/FanClubsContainer';

import { IProfileInfoProps } from './types';
import styles from './styles';

const ProfileInfo: React.FC<IProfileInfoProps> = ({
  avatarUri,
  name,
  username,
  teams,
  fanClubs,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={avatarUri} size={AvatarSize.Big} />
        </View>
        <View style={styles.info}>
          <UltrasText color="textTertiary" style={styles.name}>
            {name}
          </UltrasText>
          <UltrasText color="textTertiary" style={styles.username} numberOfLines={1}>
            {username}
          </UltrasText>
        </View>
      </View>
      {teams.length > 0 && <TeamsContainer data={teams} withBounce={false} />}
      {fanClubs.length > 0 && (
        <FanClubsContainer showHeaderButton={false} withBounce={false} />
      )}
    </>
  );
};

export default React.memo<IProfileInfoProps>(ProfileInfo);
