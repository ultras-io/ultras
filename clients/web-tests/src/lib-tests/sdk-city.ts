import { CitySdk } from '@ultras/core-api-sdk';
import { OrderEnum } from '@ultras/utils';

const sdk = new CitySdk('dev');

export const runTest = () => {
  const params = {
    countryId: 6,
    limit: 4,
    offset: 4,
    order: OrderEnum.desc,
    orderAttr: 'id',
  };

  sdk
    .getCities(params)
    ?.then((cities: any) => {
      console.log('CitySdk.getCities():', {
        params,
        result: cities,
      });
    })
    ?.catch((err: any) => {
      console.error('CitySdk.getCities():', {
        params,
        error: err,
      });
    });
};
