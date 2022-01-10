import { CountrySdk } from '@ultras/core-api-sdk';

const sdk = new CountrySdk('dev');

export const runTest = () => {
  sdk
    .getCountries()
    ?.then((countries: any) => {
      console.log('CountrySdk.getCountries():', countries);
    })
    ?.catch((err: any) => {
      console.error('CountrySdk.getCountries():', err);
    });
};
