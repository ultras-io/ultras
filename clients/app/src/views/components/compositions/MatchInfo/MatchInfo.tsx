import React from 'react';
import { Center, Image, Text, HStack, VStack } from 'native-base';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import TeamInfo from './TeamInfo';
import { commonScreens } from 'views/navigation/screens';
import { formatDateAndTime, isMatchGoing } from 'utils/helpers/matchTime';
import { MatchStatusesEnum } from '@ultras/utils';
import { IMatchInfoProps } from '../MatchCard/types';

const MatchInfo: React.FC<IMatchInfoProps> = ({ data, pressable = true, onPress }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(data.dateTime, data.status, data.elapsedTime);
  }, [data.dateTime, data.status, data.elapsedTime]);

  const openTeam = React.useCallback(
    (team: 'home' | 'away') => () =>
      pushTo(commonScreens.team.name, {
        data: team === 'home' ? data.teamHome : data.teamAway,
      }),
    [pushTo, data.teamHome, data.teamAway]
  );

  const onTeamPress = React.useCallback(
    (team: 'home' | 'away') => {
      if (!pressable) {
        if (typeof onPress === 'function') {
          onPress();
        }

        return;
      }

      openTeam(team);
    },
    [pressable, onPress, openTeam]
  );

  return (
    <HStack mx={15} my={15}>
      <TeamInfo
        onPress={() => onTeamPress('home')}
        name={data.teamHome.name}
        logo={data.teamHome.logo}
      />

      <VStack flex={5} alignItems={'center'}>
        <Center bg={colors.backgroundLogo} size={'6'} borderRadius={'3'} mb={'1.5'}>
          <Image
            source={{ uri: data.league.logo }}
            alt={data.league.name}
            size={'5'}
            resizeMode={'contain'}
          />
        </Center>

        <Text variant={'matchLeague'} textAlign={'center'} maxW={130} numberOfLines={1}>
          {data.league.name}
        </Text>

        {/* @TODO - show game minute for live matches */}
        {isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished ? (
          <Text variant={'matchTime'}>
            {data.goalsHome || 0} - {data.goalsAway || 0}
          </Text>
        ) : (
          <VStack mt={'4'} alignItems={'center'}>
            <Text variant={'matchDate'} lineHeight={'xs'}>
              {formattedDate}
            </Text>
            <Text variant={'matchTime'} lineHeight={'xs'}>
              {formattedTime}
            </Text>
          </VStack>
        )}

        <Text variant={'matchVenue'} textAlign={'center'} maxW={130} numberOfLines={2}>
          {data.venue.name}
        </Text>
      </VStack>

      <TeamInfo
        onPress={() => onTeamPress('away')}
        name={data.teamAway.name}
        logo={data.teamAway.logo}
      />
    </HStack>
  );
};

export default React.memo<IMatchInfoProps>(MatchInfo);
