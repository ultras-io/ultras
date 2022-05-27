import {
  CountryViewModel,
  CountrySDK,
  GetCountriesFilter,
  ResourceIdentifier,
} from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';
import { OrderEnum } from '@ultras/utils';

type ParamType = InitStoreParamsInterface<CountryViewModel>;
type FilterType = Filterable<GetCountriesFilter>;

const sdk = new CountrySDK('dev');

const buildCountriesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<CountryViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetCountriesFilter>) => {
      return sdk.getCountries({
        orderAttr: 'name',
        order: OrderEnum.asc,
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getCountry(id);
    },
  });
};

export default buildCountriesStore;
