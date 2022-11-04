import {
  CountryViewModel,
  GetCountriesFilter,
  ResourceIdentifier,
} from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from './generateCRUD';
import { OrderEnum } from '@ultras/utils';
import { buildCountrySDK } from './sdkBuilder/sdkBuilder';

type ParamType<TScheme> = IInitStoreParams<CountryViewModel, TScheme>;
type FilterType = Filterable<GetCountriesFilter>;

const sdk = buildCountrySDK();

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
