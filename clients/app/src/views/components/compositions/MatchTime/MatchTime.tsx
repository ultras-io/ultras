import React from 'react';
import { View, Image } from 'react-native';
import { formatDateAndTime } from 'utils/helpers/matchTime';
import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';
import { IMatchTimeProps } from './types';
import styles from './styles';

const MatchTime: React.FC<IMatchTimeProps> = ({
  matchStatus,
  leagueLogoURI,
  dateTime,
  elapsedTime,
  invert = false,
}) => {
  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(dateTime, matchStatus, elapsedTime);
  }, [dateTime, matchStatus, elapsedTime]);

  return (
    <View style={styles.container}>
      <Divider
        type={DividerType.Horizontal}
        bgColor={invert ? 'bgColorLight' : 'tertiaryText'}
      />
      <View style={styles.logoWithTime}>
        <Box bgColor="secondaryText" style={styles.logoContainer}>
          <Image source={{ uri: leagueLogoURI }} style={styles.logo} />
        </Box>
        <View style={styles.dateTime}>
          <UltrasText
            style={styles.date}
            color={invert ? 'tertiaryTextInvert' : 'tertiaryText'}
          >
            {formattedDate}
          </UltrasText>
          <UltrasText style={styles.time} color={invert ? 'textInvert' : 'text'}>
            {formattedTime}
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
