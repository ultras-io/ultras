import { VenueSDK } from '@ultras/core-api-sdk';

const sdk = new VenueSDK('dev');

export const runTest = () => {
  const params = {
    countryId: 328,
    name: 'arena',
  };

  sdk
    .getVenues(params)
    ?.then((venues: any) => {
      console.log('VenueSDK.getVenues():', {
        params,
        result: venues,
      });
    })
    ?.catch((err: any) => {
      console.error('VenueSDK.getVenues():', {
        params,
        error: err,
      });
    });
};
