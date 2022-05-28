import React from 'react';
import { View, Pressable } from 'react-native';
import I18n from 'i18n/i18n';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar from 'views/components/base/Avatar';
import Divider from 'views/components/base/Divider';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamCardProps } from './types';
import styles from './styles';

const TeamCard: React.FC<ITeamCardProps> = ({ data, onPress }) => {
  const fanClubsCount = Math.floor(Math.random() * 3);

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
                <View style={styles.divider}>
                  <Divider bgColor="textSecondary" />
                </View>
                <UltrasText style={styles.text} color="textSecondary">
                  {data.country.name}
                </UltrasText>
                <View style={styles.divider}>
                  <Divider bgColor="textSecondary" />
                </View>
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
