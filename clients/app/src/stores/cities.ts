import {
  CityViewModel,
  CitySDK,
  ResourceIdentifier,
  GetCitiesFilter,
} from '@ultras/core-api-sdk';
import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType<TScheme> = InitStoreParamsInterface<CityViewModel, TScheme>;
type FilterType = Filterable<GetCitiesFilter>;

const sdk = new CitySDK('dev');

const buildCitiesStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    CityViewModel,
    CityViewModel,
    CityViewModel,
    CityViewModel,
    ResourceIdentifier,
    FilterType,
    TScheme,
    'list' | 'single'
  >({
    keys: ['list', 'single'],
    ...(params as ParamType<TScheme>),

    loadAll: (filter: FullFilterable<GetCitiesFilter>) => {
      return sdk.getCities({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getCity(id);
    },
  });
};

export default buildCitiesStore;
