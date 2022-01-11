import { VenueSdk } from '@ultras/core-api-sdk';

const sdk = new VenueSdk('dev');

export const runTest = () => {
  const params = {
    countryId: 328,
    name: 'arena',
  };

  sdk
    .getVenues(params)
    ?.then((venues: any) => {
      console.log('VenueSdk.getVenues():', {
        params,
        result: venues,
      });
    })
    ?.catch((err: any) => {
      console.error('VenueSdk.getVenues():', {
        params,
        error: err,
      });
    });
};
