import { CountrySDK } from '@ultras/core-api-sdk';

const sdk = new CountrySDK('dev');

export const runTest = () => {
  const params = {};

  sdk
    .getCountries(params)
    ?.then((countries: any) => {
      console.log('CountrySDK.getCountries():', {
        params,
        result: countries,
      });
    })
    ?.catch((err: any) => {
      console.error('CountrySDK.getCountries():', {
        params,
        error: err,
      });
    });
};
