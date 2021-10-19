import React from 'react';
import styled from 'styled-components/native';

import {Pressable, View, Image} from 'react-native';
import {ThemeInterface} from 'styled-components';

import UltrasText from 'views/components/base/UltrasText';
import MatchTime from '../MatchTime';
import MatchScore from 'views/components/base/MatchScore';
import BluredView from 'views/components/base/BluredView';
import Divider from 'views/components/base/Divider';

import {IMatchTimeProps} from '../MatchTime';
import {IMatchCardProps} from './types';
import styles from './styles';

const StyledView = styled.View<{theme: ThemeInterface}>`
  background-color: ${({theme}) => {
    return theme.colors.text;
  }};
`;

const MatchCard: React.FC<IMatchCardProps & IMatchTimeProps> = ({
  id,
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
}) => {
  return (
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        <View style={styles.league}>
          {country && (
            <>
              <UltrasText style={styles.leagueText} color="secondaryText">
                {country}
              </UltrasText>
              <View style={styles.divider}>
                <Divider />
              </View>
            </>
          )}
          <UltrasText style={styles.leagueText} color="secondaryText">
            {league}
          </UltrasText>
        </View>
        <View style={styles.logoAndTime}>
          <StyledView style={styles.logoContainer}>
            <Image source={{uri: team1URI}} style={styles.logo} />
          </StyledView>
          <StyledView style={[styles.logoContainer, styles.logoContainer2]}>
            <Image source={{uri: team2URI}} style={styles.logo} />
          </StyledView>
          <MatchTime
            leagueImageURI={leagueImageURI}
            matchState={matchState}
            startTime={startTime}
            minute={minute}
          />
        </View>
        <View style={styles.teamAndScore}>
          <UltrasText style={styles.team} color="secondaryText">
            {team1Name}
          </UltrasText>
          {score && (
            <MatchScore
              score={score.team1Score}
              penalties={score.team1Penalties}
              matchState={matchState}
            />
          )}
        </View>
        <View style={styles.teamAndScore}>
          <UltrasText style={styles.team} color="secondaryText">
            {team2Name}
          </UltrasText>
          {score && (
            <MatchScore
              score={score.team2Score}
              penalties={score.team2Penalties}
              matchState={matchState}
            />
          )}
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IMatchCardProps & IMatchTimeProps>(MatchCard);
