import React, {useMemo} from 'react';
import {View, Image} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';

import {IMatchTimeProps, MatchStateEnum} from './types';
import styles from './styles';

const MatchTime: React.FC<IMatchTimeProps> = ({
  matchState = MatchStateEnum.NotStarted,
  leagueImageURI,
  startTime,
  minute,
}) => {
  const {date: formatedDate, time: formatedTime} = useMemo(() => {
    let date = '';
    let time = '';

    if (
      matchState === MatchStateEnum.NotStarted ||
      matchState === MatchStateEnum.Finished
    ) {
      date =
        startTime?.toLocaleDateString('de-DE', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        }) || '';
      time =
        startTime?.toLocaleTimeString([], {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }) || '';
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
          <UltrasText style={styles.date}>{formatedDate}</UltrasText>
          <UltrasText style={styles.time}>{formatedTime}</UltrasText>
        </View>
      </View>
      <Divider type={DividerType.Horizontal} />
    </View>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
