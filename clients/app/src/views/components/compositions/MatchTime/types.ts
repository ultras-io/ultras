import { MatchStatusesEnum } from '@ultras/utils';

export interface IMatchTimeProps {
  matchStatus: MatchStatusesEnum;
  leagueLogoURI: string;
  dateTime: string;
  elapsedTime?: number;
  inverted?: boolean;
}
