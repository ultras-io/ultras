import React, {useMemo} from 'react';
import {View, Image} from 'react-native';
import moment from 'moment';

import UltrasText from 'views/components/base/UltrasText';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';

import {IMatchTimeProps, MatchStateEnum} from './types';
import styles from './styles';

const MatchTime: React.FC<IMatchTimeProps> = ({
  matchState = MatchStateEnum.NotStarted,
  leagueImageURI,
  startTime,
  minute,
  invert = false,
}) => {
  const {date: formatedDate, time: formatedTime} = useMemo(() => {
    let date = '';
    let time = '';

    if (
      matchState === MatchStateEnum.NotStarted ||
      matchState === MatchStateEnum.Finished
    ) {
      date = moment(startTime).format('DD.MM.YY');
      time = moment(startTime).format('hh:mm');
    } else if (matchState === MatchStateEnum.Live) {
      date = 'Live';
      time = minute + '’';
    } else if (matchState === MatchStateEnum.ExtraTime) {
      date = 'ET';
      time = minute + '’';
    } else if (matchState === MatchStateEnum.Penalties) {
      date = 'Finished';
      time = 'Pen.';
    }

    return {
      date,
      time,
    };
  }, [startTime, matchState, minute]);

  return (
    <View style={styles.container}>
      <Divider type={DividerType.Horizontal} />
      <View style={styles.logoWithTime}>
        <Image source={{uri: leagueImageURI}} style={styles.logo} />
        <View style={styles.dateTime}>
          <UltrasText
            style={styles.date}
            color={invert ? 'tertiaryTextInvert' : 'tertiaryText'}>
            {formatedDate}
          </UltrasText>
          <UltrasText
            style={styles.time}
            color={invert ? 'textInvert' : 'text'}>
            {formatedTime}
          </UltrasText>
        </View>
      </View>
      <Divider type={DividerType.Horizontal} />
    </View>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
