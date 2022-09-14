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

type ParamType<TScheme> = InitStoreParamsInterface<CountryViewModel, TScheme>;
type FilterType = Filterable<GetCountriesFilter>;

const sdk = new CountrySDK('dev');

const buildCountriesStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    CountryViewModel,
    CountryViewModel,
    null,
    null,
    null,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

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
