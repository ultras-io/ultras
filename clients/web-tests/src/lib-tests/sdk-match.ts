import { MatchSDK } from '@ultras/core-api-sdk';

const sdk = new MatchSDK('dev');

export const runTest = () => {
  const params = {
    date: '2022-01-12',
  };

  sdk
    .getMatches(params)
    ?.then((matches: any) => {
      console.log('MatchSDK.getMatches():', {
        params,
        result: matches,
      });
    })
    ?.catch((err: any) => {
      console.error('MatchSDK.getMatches():', {
        params,
        error: err,
      });
    });
};
