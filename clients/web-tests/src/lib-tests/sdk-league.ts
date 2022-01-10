import { LeagueSdk } from '@ultras/core-api-sdk';

const sdk = new LeagueSdk('dev');

export const runTest = () => {
  const params = {
    countryId: 494,
  };

  sdk
    .getLeagues(params)
    ?.then((leagues: any) => {
      console.log('LeagueSdk.getLeagues():', {
        params,
        result: leagues,
      });
    })
    ?.catch((err: any) => {
      console.error('LeagueSdk.getLeagues():', {
        params,
        error: err,
      });
    });
};
