import React from 'react';
import { Pressable, View, Image } from 'react-native';
import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import MatchTime from '../MatchTime';
import MatchScore from 'views/components/base/MatchScore';
import BluredView from 'views/components/base/BluredView';
import Divider from 'views/components/base/Divider';
import Like from 'views/components/base/Like';
// import CommentsCount from 'views/components/base/CommentsCount';
import { isMatchGoing } from 'utils/helpers/matchTime';
import { WinnerEnum, MatchStatusesEnum } from '@ultras/utils';
import { IMatchCardProps } from './types';
import styles from './styles';

const WORLD_AS_COUNTRY_ID = 162;

const MatchCard: React.FC<IMatchCardProps> = ({ onPress, data, horizontal = false }) => {
  const Container = horizontal ? Box : BluredView;
  const innerCardColor = horizontal ? 'white' : 'cardBackground';
  const textColor = horizontal ? 'black' : 'textPrimary';

  return (
    <Pressable onPress={onPress}>
      <Container
        style={horizontal ? styles.containerH : styles.container}
        bgColor="cardSilverBackground"
      >
        <View style={styles.league}>
          {data.league.country.id !== WORLD_AS_COUNTRY_ID && (
            <>
              <UltrasText style={styles.leagueText} color={textColor}>
                {data.league.country.name}
              </UltrasText>
              <View style={styles.divider}>
                <Divider bgColor={textColor} />
              </View>
            </>
          )}
          <UltrasText style={styles.leagueText} color={textColor}>
            {data.league.name}
          </UltrasText>
        </View>

        <View style={styles.logoAndTime}>
          <Box style={styles.logoContainer} bgColor={innerCardColor}>
            <Image source={{ uri: data.teamHome.logo }} style={styles.logo} />
          </Box>
          <Box
            style={[styles.logoContainer, styles.logoContainer2]}
            bgColor={innerCardColor}
          >
            <Image source={{ uri: data.teamAway.logo }} style={styles.logo} />
          </Box>
          <MatchTime
            matchStatus={data.status}
            dateTime={data.dateTime}
            elapsedTime={data.elapsedTime}
            leagueLogoURI={data.league.logo}
            invert={horizontal}
          />
        </View>
        <View style={styles.teamAndScore}>
          <UltrasText
            style={[styles.team, data.winner === WinnerEnum.home ? styles.winner : null]}
            color={textColor}
            numberOfLines={1}
          >
            {data.teamHome.name}
          </UltrasText>
          {(isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished) && (
            <MatchScore
              score={data.goalsHome || 0}
              // penalties={score.team1Penalties || 0}
              matchStatus={data.status}
              invert={horizontal}
            />
          )}
        </View>

        <View style={styles.teamAndScore}>
          <UltrasText
            style={[styles.team, data.winner === WinnerEnum.away ? styles.winner : null]}
            color={textColor}
            numberOfLines={1}
          >
            {data.teamAway.name}
          </UltrasText>
          {(isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished) && (
            <MatchScore
              score={data.goalsAway || 0}
              // penalties={score.team1Penalties || 0}
              matchStatus={data.status}
              invert={horizontal}
            />
          )}
        </View>
        {!horizontal && (
          <View style={styles.actionBox}>
            <Like isLiked={false} onPress={() => {}} count={0} />
            {/* <View style={styles.comments}>
              <CommentsCount count={0} />
            </View> */}
          </View>
        )}
      </Container>
    </Pressable>
  );
};

export default React.memo<IMatchCardProps>(MatchCard);
