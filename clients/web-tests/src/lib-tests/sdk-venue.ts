import { VenueSdk } from '@ultras/core-api-sdk';

const sdk = new VenueSdk('dev');

export const runTest = () => {
  sdk
    .getVenues({ countryId: 328, name: 'arena' })
    ?.then((venues: any) => {
      console.log("VenueSdk.getVenues({ countryId: 328, name: 'arena' }):", venues);
    })
    ?.catch((err: any) => {
      console.error("VenueSdk.getVenues({ countryId: 328, name: 'arena' }):", err);
    });
};
