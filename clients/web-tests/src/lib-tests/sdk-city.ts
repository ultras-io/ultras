import { CitySdk } from '@ultras/core-api-sdk';

const sdk = new CitySdk('dev');

export const runTest = () => {
  sdk
    .getCities({ countryId: 6 })
    ?.then((cities: any) => {
      console.log('CitySdk.getCities({ countryId: 6 }):', cities);
    })
    ?.catch((err: any) => {
      console.error('CitySdk.getCities({ countryId: 6 }):', err);
    });
};
