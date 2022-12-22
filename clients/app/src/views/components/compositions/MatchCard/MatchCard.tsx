import React from 'react';
import { Pressable, Text, HStack, Center, Image } from 'native-base';
import { useTheme } from 'themes';
import VerticalDivider from 'views/components/base/VerticalDivider';
import MatchTime from '../MatchTime';
import BluredView from 'views/components/base/BluredView';
import { isMatchGoing } from 'utils/helpers/matchTime';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { MatchStatusesEnum } from '@ultras/utils';
import { IMatchCardProps } from './types';
import styles from './styles';

const WORLD_AS_COUNTRY_ID = 162;

const MatchCard: React.FC<IMatchCardProps> = ({ onPress, data, inverted = false }) => {
  const { colors } = useTheme();
  const variantSuffix = inverted ? 'Invert' : '';

  return (
    <Pressable onPress={preventMultiCalls(onPress)}>
      <BluredView
        style={inverted ? styles.containerH : styles.container}
        isDark={!inverted}
      >
        <HStack>
          {data.league.country?.id !== WORLD_AS_COUNTRY_ID && (
            <>
              <Text variant={'matchLeague' + variantSuffix} fontSize={'sm'}>
                {data.league.country?.name}
              </Text>
              <VerticalDivider key={'divider'} />
            </>
          )}
          <Text variant={'matchLeague' + variantSuffix} fontSize={'sm'}>
            {data.league.name}
          </Text>
        </HStack>

        <HStack mt={'1.5'} mb={'2'}>
          <Center size={'30'} bg={colors.backgroundLogo} mr={'0.5'}>
            <Image
              source={{ uri: data.teamHome.logo }}
              alt={data.teamHome.name}
              size={'5'}
              resizeMode={'contain'}
            />
          </Center>
          <Center size={'30'} bg={colors.backgroundLogo} mr={'1.5'}>
            <Image
              source={{ uri: data.teamAway.logo }}
              alt={data.teamAway.name}
              size={'5'}
              resizeMode={'contain'}
            />
          </Center>
          <MatchTime
            matchStatus={data.status}
            dateTime={data.dateTime}
            elapsedTime={data.elapsedTime}
            leagueLogoURI={data.league.logo}
            inverted={inverted}
          />
        </HStack>

        <HStack mt={'1'} justifyContent={'space-between'}>
          <Text variant={'matchTeam' + variantSuffix} numberOfLines={1}>
            {data.teamHome.name}
          </Text>
          {(isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished) && (
            <Text variant={'matchTeam' + variantSuffix}>{data.goalsHome}</Text>
          )}
        </HStack>

        <HStack mt={'1'} justifyContent={'space-between'}>
          <Text variant={'matchTeam' + variantSuffix} numberOfLines={1}>
            {data.teamAway.name}
          </Text>
          {(isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished) && (
            <Text variant={'matchTeam' + variantSuffix}>{data.goalsAway}</Text>
          )}
        </HStack>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IMatchCardProps>(MatchCard);
