import {
  EventViewModel,
  EventSDK,
  ResourceIdentifier,
  GetEventsFilter,
} from '@ultras/core-api-sdk';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  InitStoreParamsInterface,
} from './generateCRUD';

type ParamType = InitStoreParamsInterface<EventViewModel>;
type FilterType = Filterable<GetEventsFilter>;

const sdk = new EventSDK('dev');

const buildEventsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<EventViewModel, FilterType, 'list' | 'single'>({
    keys: ['list', 'single'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetEventsFilter>) => {
      return sdk.getEvents({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getEvent(id);
    },
  });
};

export default buildEventsStore;
