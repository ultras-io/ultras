import React from 'react';
import {View, Pressable} from 'react-native';
import I18n from 'i18n/i18n';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import Divider from 'views/components/base/Divider';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {ISupportersClubCardProps} from './types';

import styles from './styles';

const SupportersClubCard: React.FC<ISupportersClubCardProps> = ({
  avatarUri,
  name,
  ultrasCount,
  city,
  direction = 'vertical',
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      {direction === 'vertical' ? (
        <BluredView style={styles.container}>
          <View style={styles.avatar}>
            <Avatar avatarUri={avatarUri} size={AvatarSize.Default} />
          </View>
          <View style={styles.info}>
            <UltrasText color="text" style={styles.name}>
              {name}
            </UltrasText>
            <View style={styles.line}>
              <UltrasText color="text" style={styles.text}>
                {getReadableNumber(ultrasCount)} {I18n.t('ultras')}
              </UltrasText>
              <View style={styles.divider}>
                <Divider />
              </View>
              <UltrasText color="text" style={styles.text}>
                {city}
              </UltrasText>
            </View>
          </View>
        </BluredView>
      ) : (
        <View style={styles.containerH}>
          <View style={styles.avatarH}>
            <Avatar avatarUri={avatarUri} size={AvatarSize.Big} />
          </View>
          <UltrasText color="text" style={styles.nameH} numberOfLines={3}>
            {name}
          </UltrasText>
          <UltrasText color="secondaryText" style={styles.ultrasCountH}>
            {getReadableNumber(ultrasCount)} {I18n.t('ultras')}
          </UltrasText>
        </View>
      )}
    </Pressable>
  );
};

export default React.memo<ISupportersClubCardProps>(SupportersClubCard);
