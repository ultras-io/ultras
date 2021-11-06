import React from 'react';
import {View, Image} from 'react-native';

import {formatDateAndTime} from 'utils/helpers/matchTime';

import Box from 'views/components/base/Box';
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
  const {date: formatedDate, time: formatedTime} = React.useMemo(() => {
    return formatDateAndTime(startTime, matchState, minute);
  }, [startTime, matchState, minute]);

  return (
    <View style={styles.container}>
      <Divider
        type={DividerType.Horizontal}
        bgColor={invert ? 'bgColorLight' : 'tertiaryText'}
      />
      <View style={styles.logoWithTime}>
        <Box bgColor="secondaryText" style={styles.logoContainer}>
          <Image source={{uri: leagueImageURI}} style={styles.logo} />
        </Box>
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
      <Divider
        type={DividerType.Horizontal}
        bgColor={invert ? 'bgColorLight' : 'tertiaryText'}
      />
    </View>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
