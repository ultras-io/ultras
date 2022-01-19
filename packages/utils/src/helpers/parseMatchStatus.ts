import MatchStatusesEnum from '../enums/MatchStatusesEnum';

export type MatchStatusRapidType =
  | 'TBD' // Time To Be Defined
  | 'NS' // Not Started
  | '1H' // First Half, Kick Off
  | 'HT' // Halftime
  | '2H' // Second Half, 2nd Half Started
  | 'ET' // Extra Time
  | 'P' // Penalty In Progress
  | 'FT' // Match Finished
  | 'AET' // Match Finished After Extra Time
  | 'PEN' // Match Finished After Penalty
  | 'BT' // Break Time (in Extra Time)
  | 'SUSP' // Match Suspended
  | 'INT' // Match Interrupted
  | 'PST' // Match Postponed
  | 'CANC' // Match Cancelled
  | 'ABD' // Match Abandoned
  | 'AWD' // Technical Loss
  | 'WO' // WalkOver
  | 'LIVE'; // In Progress

const statusAdapterList: Record<MatchStatusRapidType, MatchStatusesEnum> = {
  TBD: MatchStatusesEnum.timeToBeDefined,
  NS: MatchStatusesEnum.preMatch,
  '1H': MatchStatusesEnum.live,
  HT: MatchStatusesEnum.halfTime,
  '2H': MatchStatusesEnum.live,
  ET: MatchStatusesEnum.extraTime,
  P: MatchStatusesEnum.penalties,
  FT: MatchStatusesEnum.finished,
  AET: MatchStatusesEnum.finished,
  PEN: MatchStatusesEnum.finished,
  BT: MatchStatusesEnum.extraTime,
  SUSP: MatchStatusesEnum.suspended,
  INT: MatchStatusesEnum.interrupted,
  PST: MatchStatusesEnum.postponed,
  CANC: MatchStatusesEnum.canceled,
  ABD: MatchStatusesEnum.interrupted,
  AWD: MatchStatusesEnum.finished,
  WO: MatchStatusesEnum.finished,
  LIVE: MatchStatusesEnum.live,
};

function parseMatchStatus(rapidApiStatus: MatchStatusRapidType): MatchStatusesEnum {
  return statusAdapterList[rapidApiStatus];
}

export default parseMatchStatus;
