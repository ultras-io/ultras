import { MatchStatusesEnum } from '@ultras/utils';

export interface IMatchScoreProps {
  score: number;
  penalties?: number;
  matchStatus?: MatchStatusesEnum;
  size?: 'default' | 'big';
  invert?: boolean;
}
