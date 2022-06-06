import React from 'react';
import { HStack, VStack, Box, Center, Image, Divider, Text } from 'native-base';
import { useTheme } from 'themes';
import { formatDateAndTime } from 'utils/helpers/matchTime';
import { IMatchTimeProps } from './types';

const MatchTime: React.FC<IMatchTimeProps> = ({
  matchStatus,
  leagueLogoURI,
  dateTime,
  elapsedTime,
  inverted = false,
}) => {
  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(dateTime, matchStatus, elapsedTime);
  }, [dateTime, matchStatus, elapsedTime]);

  const { colors } = useTheme();
  const variantSuffix = inverted ? 'Invert' : '';

  return (
    <Box w={'16'}>
      <Divider />
      <HStack paddingY={'1'}>
        <Center bg={colors.backgroundLogo} size={'5'} p={'0.5'} borderRadius={'3'}>
          <Image
            source={{ uri: leagueLogoURI }}
            alt={leagueLogoURI}
            size={'4'}
            resizeMode={'contain'}
          />
        </Center>
        <VStack ml={'1'}>
          <Text variant={'matchDate' + variantSuffix} fontSize={'2xs'} lineHeight={'2xs'}>
            {formattedDate}
          </Text>
          <Text variant={'matchTeam' + variantSuffix} fontSize={'sm'} lineHeight={'xs'}>
            {formattedTime}
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </Box>
  );
};

export default React.memo<IMatchTimeProps>(MatchTime);
