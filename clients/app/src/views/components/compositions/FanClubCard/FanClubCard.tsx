import React from 'react';
import { View, Pressable } from 'react-native';
import { Divider, Center } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import { IFanClubCardProps } from './types';
import styles from './styles';

const stylesDictionary = {
  [AvatarSize.Small]: styles.small,
  [AvatarSize.Default]: styles.default,
  [AvatarSize.Big]: styles.big,
  [AvatarSize.ExtraBig]: styles.extraBig,
};

const FanClubCard: React.FC<IFanClubCardProps> = ({
  data,
  avatarSize = AvatarSize.Big,
  direction = 'vertical',
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      {direction === 'vertical' ? (
        <BluredView style={styles.container}>
          <View style={styles.avatar}>
            <Avatar avatarUri={data.avatar} size={AvatarSize.Default} />
          </View>
          <View style={styles.info}>
            <UltrasText color="textPrimary" style={styles.name}>
              {data.name}
            </UltrasText>
            <View style={styles.line}>
              <UltrasText color="textPrimary" style={styles.text}>
                {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
              </UltrasText>
              <Center>
                <Divider
                  orientation="vertical"
                  mx={2}
                  height={2}
                  bg={colors.backgroundDividerTransparent}
                />
              </Center>
              <UltrasText color="textSecondary" style={styles.text}>
                {data.city.name}
              </UltrasText>
            </View>
          </View>
        </BluredView>
      ) : (
        <View style={[styles.containerH, stylesDictionary[avatarSize]]}>
          <View style={styles.avatarH}>
            <Avatar avatarUri={data.avatar} size={avatarSize} />
          </View>
          <UltrasText color="textPrimary" style={styles.nameH} numberOfLines={2}>
            {data.name}
          </UltrasText>
          {data.membersCount && (
            <UltrasText color="textSecondary" style={styles.ultrasCountH}>
              {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
            </UltrasText>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default React.memo<IFanClubCardProps>(FanClubCard);
