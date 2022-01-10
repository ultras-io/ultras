import { CitySdk } from '@ultras/core-api-sdk';

const sdk = new CitySdk('dev');

export const runTest = () => {
  sdk
    .getCities({ countryId: 6, limit: 4, offset: 4 })
    ?.then((cities: any) => {
      console.log('CitySdk.getCities({ countryId: 6, limit: 4, offset: 4 }):', cities);
    })
    ?.catch((err: any) => {
      console.error('CitySdk.getCities({ countryId: 6, limit: 4, offset: 4 }):', err);
    });
};
