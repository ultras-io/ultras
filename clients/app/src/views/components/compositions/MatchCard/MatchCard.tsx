import React from 'react';
import styled from 'styled-components/native';
import {View, Image} from 'react-native';
import UltrasText from 'views/components/base/UltrasText';

import MatchTime from '../MatchTime';
import MatchScore from 'views/components/base/MatchScore';

import {IMatchTimeProps} from '../MatchTime';
import {IMatchCardProps} from './types';
import styles from './styles';

const StyledContainer = styled.View<IMatchCardProps & IMatchTimeProps>`
  background-color: ${({theme}) => {
    return theme.colors.bgColor;
  }};
`;
const StyledView = styled.View<IMatchCardProps & IMatchTimeProps>`
  background-color: ${({theme}) => {
    return theme.colors.text;
  }};
`;

const MatchCard: React.FC<IMatchCardProps & IMatchTimeProps> = ({
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
    <StyledContainer style={styles.container}>
      <UltrasText style={styles.league} color="text">
        {country} {league}
      </UltrasText>
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
        <UltrasText style={styles.team} color="text">
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
        <UltrasText style={styles.team} color="text">
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
    </StyledContainer>
  );
};

export default React.memo<IMatchCardProps & IMatchTimeProps>(MatchCard);
