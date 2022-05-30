import React from 'react';
import { View, Pressable } from 'react-native';
import { Divider, Center } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar from 'views/components/base/Avatar';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamCardProps } from './types';
import styles from './styles';

const TeamCard: React.FC<ITeamCardProps> = ({ data, onPress }) => {
  const fanClubsCount = Math.floor(Math.random() * 3);
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={data.logo} isTeam />
        </View>
        <View style={styles.info}>
          <UltrasText color="textPrimary" style={styles.name}>
            {data.name}
          </UltrasText>
          <View style={styles.line}>
            <UltrasText color="textSecondary" style={styles.text}>
              {fanClubsCount === 0 && I18n.t('noFanClubs')}
              {fanClubsCount === 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClub')}
              {fanClubsCount > 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClubs')}
            </UltrasText>
            {data.type === TeamTypesEnum.club && (
              <>
                <Center>
                  <Divider
                    orientation="vertical"
                    mx={2}
                    height={2}
                    bg={colors.backgroundDividerTransparent}
                  />
                </Center>
                <UltrasText style={styles.text} color="textSecondary">
                  {data.country.name}
                </UltrasText>
                <Center>
                  <Divider
                    orientation="vertical"
                    mx={2}
                    height={2}
                    bg={colors.backgroundDividerTransparent}
                  />
                </Center>
                <UltrasText style={styles.text} color="textSecondary">
                  {data.city.name}
                </UltrasText>
              </>
            )}
          </View>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<ITeamCardProps>(TeamCard);
