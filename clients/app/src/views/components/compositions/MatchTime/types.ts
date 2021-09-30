export enum MatchStateEnum {
  NotStarted,
  Live,
  ExtraTime,
  Penalties,
  Finished,
}

export interface IMatchTimeProps {
  matchState?: MatchStateEnum;
  leagueImageURI?: string;
  startTime?: Date;
  minute?: number;
}
