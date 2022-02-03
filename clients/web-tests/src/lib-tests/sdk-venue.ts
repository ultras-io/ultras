import { VenueSDk } from '@ultras/core-api-sdk';

const sdk = new VenueSDk('dev');

export const runTest = () => {
  const params = {
    countryId: 328,
    name: 'arena',
  };

  sdk
    .getVenues(params)
    ?.then((venues: any) => {
      console.log('VenueSDk.getVenues():', {
        params,
        result: venues,
      });
    })
    ?.catch((err: any) => {
      console.error('VenueSDk.getVenues():', {
        params,
        error: err,
      });
    });
};
