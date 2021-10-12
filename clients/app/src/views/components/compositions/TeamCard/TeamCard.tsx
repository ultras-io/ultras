import React from 'react';
import {View} from 'react-native';
import I18n from 'i18n/i18n';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import Divider from 'views/components/base/Divider';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {ITeamCardProps} from './types';

import styles from './styles';

const TeamCard: React.FC<ITeamCardProps> = ({
  avatarUri,
  name,
  supportersClubsCount,
  country,
  city,
}) => {
  return (
    <BluredView style={styles.container}>
      <View style={styles.avatar}>
        <Avatar uri={avatarUri} size={AvatarSize.Default} />
      </View>
      <View style={styles.info}>
        <UltrasText color="text" style={styles.name}>
          {name}
        </UltrasText>
        <View style={styles.line}>
          <UltrasText color="secondaryText" style={styles.text}>
            {getReadableNumber(supportersClubsCount)}{' '}
            {I18n.t('supportersClubs')}
          </UltrasText>
          {country && (
            <>
              <View style={styles.divider}>
                <Divider />
              </View>
              <UltrasText style={styles.text} color="secondaryText">
                {country}
              </UltrasText>
            </>
          )}
          {city && (
            <>
              <View style={styles.divider}>
                <Divider />
              </View>
              <UltrasText style={styles.text} color="secondaryText">
                {city}
              </UltrasText>
            </>
          )}
        </View>
      </View>
    </BluredView>
  );
};

export default React.memo<ITeamCardProps>(TeamCard);
