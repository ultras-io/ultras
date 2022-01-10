import { LeagueSdk } from '@ultras/core-api-sdk';

const sdk = new LeagueSdk('dev');

export const runTest = () => {
  sdk
    .getLeagues({ countryId: 494 })
    ?.then((leagues: any) => {
      console.log('LeagueSdk.getLeagues({ countryId: 494 }):', leagues);
    })
    ?.catch((err: any) => {
      console.error('LeagueSdk.getLeagues({ countryId: 494 }):', err);
    });
};
