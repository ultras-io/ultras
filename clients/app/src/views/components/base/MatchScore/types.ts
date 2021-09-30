import {MatchStateEnum} from 'views/components/compositions/MatchTime';

export interface IMatchScoreProps {
  score: number;
  penalties?: number;
  matchState?: MatchStateEnum;
}
