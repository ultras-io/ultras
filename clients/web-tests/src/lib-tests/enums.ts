import { TeamTypes, MatchStatuses } from '@ultras/utils';

export const runTest = () => {
  console.log('enums:', {
    TeamTypes,
    teamNational: TeamTypes.national,
    MatchStatuses,
    matchHalfTime: MatchStatuses.halfTime,
  });
};
