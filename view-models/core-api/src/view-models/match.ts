import { WinnerEnum, MatchStatusesEnum, MatchScoreTypesEnum } from '@ultras/utils';

import { LeagueViewModel } from './league';
import { TeamViewModel } from './team';
import { VenueViewModel } from './venue';

export type ScoreViewModel = ViewModel<{
  home: number;
  away: number;
  type: MatchScoreTypesEnum;
}>;

export type MatchViewModel = ViewModel<{
  dateTime: string;
  teamHome: TeamViewModel;
  teamAway: TeamViewModel;
  goalsHome: number;
  goalsAway: number;
  venue: VenueViewModel;
  league: LeagueViewModel;
  status: MatchStatusesEnum;
  elapsedTime: number;
  winner: WinnerEnum;
  score: ScoreViewModel;
  caught?: boolean;
}>;

export type MatchesViewModel = Array<MatchViewModel>;
