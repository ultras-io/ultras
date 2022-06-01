import React from 'react';
import { Divider, Image, Text, HStack, VStack } from 'native-base';
import { useTheme } from 'themes';
import TeamInfo from './TeamInfo';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchScore from 'views/components/base/MatchScore';
import { formatDateAndTime, isMatchGoing } from 'utils/helpers/matchTime';
import { MatchStatusesEnum } from '@ultras/utils';
import Box from 'views/components/base/Box';
import { IMatchInfoProps } from '../MatchCard/types';
import styles from './styles';

const MatchInfo: React.FC<IMatchInfoProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(data.dateTime, data.status, data.elapsedTime);
  }, [data.dateTime, data.status, data.elapsedTime]);

  return (
    <>
      <HStack mx={15} my={15}>
        <TeamInfo
          onPress={() => pushTo(commonScreens.team.name, { data: data.teamHome })}
          name={data.teamHome.name}
          logo={data.teamHome.logo}
        />
        <VStack flex={5} alignItems={'center'}>
          <Box bgColor="backgroundLogo" style={styles.leagueLogoContainer}>
            <Image
              source={{ uri: data.league.logo }}
              style={styles.leagueLogo}
              resizeMode={'contain'}
            />
          </Box>

          <Text
            variant={'primary'}
            textAlign={'center'}
            fontSize={'xs'}
            maxW={130}
            numberOfLines={1}
          >
            {data.league.name}
          </Text>

          {/* @TODO - show game minute for live matches */}
          {isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished ? (
            <HStack mt={'2.5'} mb={'1'}>
              <MatchScore
                score={data.goalsHome || 0}
                // penalties={score.team1Penalties || 0}
                matchStatus={data.status}
                size={'big'}
              />
              <Text variant={'primary'} fontSize={'5xl'} lineHeight={'xs'}>
                {' '}
                -{' '}
              </Text>
              <MatchScore
                score={data.goalsAway || 0}
                // penalties={score.team1Penalties || 0}
                matchStatus={data.status}
                size={'big'}
              />
            </HStack>
          ) : (
            <VStack mt={'4'}>
              <Text variant={'quinary'} fontSize={'lg'} lineHeight={'xs'}>
                {formattedDate}
              </Text>
              <Text
                variant={'primary'}
                fontSize={'5xl'}
                lineHeight={'xs'}
                fontWeight={'600'}
              >
                {formattedTime}
              </Text>
            </VStack>
          )}

          <Text
            variant={'quinary'}
            textAlign={'center'}
            fontSize={'xs'}
            maxW={130}
            numberOfLines={2}
          >
            {data.venue.name}
          </Text>
        </VStack>
        <TeamInfo
          onPress={() => pushTo(commonScreens.team.name, { data: data.teamAway })}
          name={data.teamAway.name}
          logo={data.teamAway.logo}
        />
      </HStack>

      {/* <View style={styles.button}>
        <Button
          title={I18n.t('eventsCreate')}
          onPress={() => pushTo(commonScreens.newEvent.name)}
          color="textPrimaryInvert"
          bgColor="buttonAction"
          icon={Icons.Add}
          iconPosition={ButtonIconPosition.Left}
        />
      </View> */}

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} mt={15} />
    </>
  );
};

export default React.memo<IMatchInfoProps>(MatchInfo);
