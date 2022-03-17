import {
  ApiResponseType,
  CountriesViewModel,
  CountrySDK,
  ListResponseMetaType,
} from '@ultras/core-api-sdk';

const sdk = new CountrySDK('dev');

export const runTest = () => {
  const params = {};

  return sdk
    .getCountries(params)
    ?.then((countries: ApiResponseType<CountriesViewModel, ListResponseMetaType>) => {
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
