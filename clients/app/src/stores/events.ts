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

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = new EventSDK('dev');

const buildEventsStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    EventViewModel,
    EventViewModel,
    EventViewModel,
    EventViewModel,
    TDeleteEvent,
    FilterType,
    'list' | 'single' | 'delete'
  >({
    keys: ['list', 'single', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: FullFilterable<GetEventsFilter>) => {
      return sdk.getEvents({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getEvent(id);
    },

    remove: (data: TDeleteEvent) => {
      return sdk.deleteEvent(data.eventId);
    },
  });
};

export default buildEventsStore;
