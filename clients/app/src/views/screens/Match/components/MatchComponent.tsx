import React from 'react';

import MatchInfo from 'views/components/compositions/MatchInfo';

import {IMatchComponentProps} from '../types';
// import styles from '../styles';

const MatchComponent: React.FC<IMatchComponentProps> = ({data}) => {
  return (
    <MatchInfo
      id={data.id}
      team1Name={data.team1Name}
      team2Name={data.team2Name}
      team1URI={data.team1URI}
      team2URI={data.team2URI}
      country={data.country}
      league={data.league}
      score={data.score}
      matchState={data.matchState}
      leagueImageURI={data.leagueImageURI}
      startTime={data.startTime}
      minute={data.minute}
      venue={data.venue}
    />
  );
};

export default MatchComponent;
