import React from 'react';
import { Pressable, View, Image } from 'react-native';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import MatchTime from '../MatchTime';
import MatchScore from 'views/components/base/MatchScore';
import BluredView from 'views/components/base/BluredView';
import Divider from 'views/components/base/Divider';
import Like from 'views/components/base/Like';
import CommentsCount from 'views/components/base/CommentsCount';

import { IMatchTimeProps } from '../MatchTime';
import { IMatchCardProps } from './types';
import styles from './styles';

const MatchCard: React.FC<IMatchCardProps & IMatchTimeProps> = ({
  onPress,
  team1Name,
  team2Name,
  team1URI,
  team2URI,
  country,
  league,
  score,
  matchState,
  leagueImageURI,
  startTime,
  minute,
  horizontal = false,
}) => {
  const Container = horizontal ? Box : BluredView;

  return (
    <Pressable onPress={onPress}>
      <Container
        style={horizontal ? styles.containerH : styles.container}
        bgColor={'secondaryText'}
      >
        <View style={styles.league}>
          {country && (
            <>
              <UltrasText
                style={styles.leagueText}
                color={horizontal ? 'secondaryTextInvert' : 'secondaryText'}
              >
                {country}
              </UltrasText>
              <View style={styles.divider}>
                <Divider bgColor={horizontal ? 'secondaryTextInvert' : 'secondaryText'} />
              </View>
            </>
          )}
          <UltrasText
            style={styles.leagueText}
            color={horizontal ? 'secondaryTextInvert' : 'secondaryText'}
          >
            {league}
          </UltrasText>
        </View>
        <View style={styles.logoAndTime}>
          <Box style={styles.logoContainer} bgColor={'text'}>
            <Image source={{ uri: team1URI }} style={styles.logo} />
          </Box>
          <Box style={[styles.logoContainer, styles.logoContainer2]} bgColor={'text'}>
            <Image source={{ uri: team2URI }} style={styles.logo} />
          </Box>
          <MatchTime
            leagueImageURI={leagueImageURI}
            matchState={matchState}
            startTime={startTime}
            minute={minute}
            invert={horizontal}
          />
        </View>
        <View style={styles.teamAndScore}>
          <UltrasText
            style={styles.team}
            color={horizontal ? 'textInvert' : 'secondaryText'}
            numberOfLines={1}
          >
            {team1Name}
          </UltrasText>
          {score && (
            <MatchScore
              score={score.team1Score || 0}
              penalties={score.team1Penalties || 0}
              matchState={matchState}
              invert={horizontal}
            />
          )}
        </View>
        <View style={styles.teamAndScore}>
          <UltrasText
            style={styles.team}
            color={horizontal ? 'textInvert' : 'secondaryText'}
            numberOfLines={1}
          >
            {team2Name}
          </UltrasText>
          {score && (
            <MatchScore
              score={score.team2Score || 0}
              penalties={score.team2Penalties || 0}
              matchState={matchState}
              invert={horizontal}
            />
          )}
        </View>
        {!horizontal && (
          <View style={styles.actionBox}>
            <Like
              isLiked={Math.round(Math.random() * (4000 - 1)) > 2000}
              onPress={() => {}}
              count={Math.round(Math.random() * (4000 - 1) + 1)}
            />
            <View style={styles.comments}>
              <CommentsCount count={345} />
            </View>
          </View>
        )}
      </Container>
    </Pressable>
  );
};

export default React.memo<IMatchCardProps & IMatchTimeProps>(MatchCard);
