import React from 'react';
import UltrasText from 'views/components/base/UltrasText';
import { MatchStatusesEnum } from '@ultras/utils';
import { IMatchScoreProps } from './types';
import styles from './styles';
import { ColorKey } from 'themes/types';

const MatchScore: React.FC<IMatchScoreProps> = ({
  score,
  penalties,
  matchStatus,
  size = 'default',
  invert = false,
}) => {
  const color: ColorKey =
    matchStatus === MatchStatusesEnum.finished
      ? invert
        ? 'textSecondary'
        : 'textPrimary'
      : 'textAction';

  return (
    <UltrasText style={[styles.score, size === 'big' ? styles.big : null]} color={color}>
      {score}
      <UltrasText style={styles.penalties} color={color}>
        {matchStatus === MatchStatusesEnum.penalties && ' (' + (penalties || 0) + ')'}
      </UltrasText>
    </UltrasText>
  );
};

export default React.memo<IMatchScoreProps>(MatchScore);
