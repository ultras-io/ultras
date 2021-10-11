import React from 'react';
import UltrasText from 'views/components/base/UltrasText';

import {MatchStateEnum as MatchState} from 'views/components/compositions/MatchTime';

import {IMatchScoreProps} from './types';
import styles from './styles';

const MatchScore: React.FC<IMatchScoreProps> = ({
  score,
  penalties,
  matchState,
}) => {
  return (
    <UltrasText
      style={styles.score}
      color={matchState === MatchState.Finished ? 'lightText' : 'primary'}>
      {score}
      {matchState === MatchState.Penalties && ' (' + penalties + ')'}
    </UltrasText>
  );
};

export default React.memo<IMatchScoreProps>(MatchScore);