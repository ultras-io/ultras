import { CountrySdk } from '@ultras/core-api-sdk';

const sdk = new CountrySdk('dev');

export const runTest = () => {
  const params = {};

  sdk
    .getCountries(params)
    ?.then((countries: any) => {
      console.log('CountrySdk.getCountries():', {
        params,
        result: countries,
      });
    })
    ?.catch((err: any) => {
      console.error('CountrySdk.getCountries():', {
        params,
        error: err,
      });
    });
};
