import { MatchSdk } from '@ultras/core-api-sdk';

const sdk = new MatchSdk('dev');

export const runTest = () => {
  const params = {
    date: '2022-01-12',
  };

  sdk
    .getMatches(params)
    ?.then((matches: any) => {
      console.log('MatchSdk.getMatches():', {
        params,
        result: matches,
      });
    })
    ?.catch((err: any) => {
      console.error('MatchSdk.getMatches():', {
        params,
        error: err,
      });
    });
};
