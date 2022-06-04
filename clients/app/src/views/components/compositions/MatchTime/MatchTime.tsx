import React from 'react';
import { View, Image } from 'react-native';
import { Divider, Text } from 'native-base';
import { formatDateAndTime } from 'utils/helpers/matchTime';
import Box from 'views/components/base/Box';
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

  const variantSuffix = invert ? 'Invert' : '';

  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.logoWithTime}>
        <Box bgColor="backgroundLogo" style={styles.logoContainer}>
          <Image source={{ uri: leagueLogoURI }} style={styles.logo} />
        </Box>
        <View style={styles.dateTime}>
          <Text variant={'matchDate' + variantSuffix} fontSize={'2xs'} lineHeight={'2xs'}>
            {formattedDate}
          </Text>
          <Text variant={'matchTeam' + variantSuffix} fontSize={'sm'} lineHeight={'xs'}>
            {formattedTime}
          </Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
