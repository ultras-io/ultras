import { CitySDK } from '@ultras/core-api-sdk';
import { OrderEnum } from '@ultras/utils';

const sdk = new CitySDK('dev');

export const runTest = () => {
  const params = {
    countryId: 6,
    limit: 4,
    offset: 4,
    order: OrderEnum.desc,
    orderAttr: 'id',
  };

  return sdk
    .getCities(params)
    ?.then((cities: any) => {
      console.log('CitySDK.getCities():', {
        params,
        result: cities,
      });
    })
    ?.catch((err: any) => {
      console.error('CitySDK.getCities():', {
        params,
        error: err,
      });
    });
};
