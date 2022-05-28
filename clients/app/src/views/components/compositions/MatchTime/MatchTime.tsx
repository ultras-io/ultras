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

  const textColor = invert ? 'black' : 'textPrimary';

  return (
    <View style={styles.container}>
      <Divider type={DividerType.Horizontal} bgColor="lightGray" />
      <View style={styles.logoWithTime}>
        <Box bgColor={textColor} style={styles.logoContainer}>
          <Image source={{ uri: leagueLogoURI }} style={styles.logo} />
        </Box>
        <View style={styles.dateTime}>
          <UltrasText style={styles.date} color={textColor}>
            {formattedDate}
          </UltrasText>
          <UltrasText style={styles.time} color={textColor}>
            {formattedTime}
          </UltrasText>
        </View>
      </View>
      <Divider type={DividerType.Horizontal} bgColor="lightGray" />
    </View>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
