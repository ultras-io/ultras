import { EventViewModel, GetEventsFilter, CreateEventType } from '@ultras/core-api-sdk';
import { buildEventSDK } from 'stores/sdkBuilder/sdkBuilder';

import {
  Filterable,
  FullFilterable,
  generateCRUD,
  IInitStoreParams,
} from '../generateCRUD';

import { scheme } from './scheme';

type ParamType<TScheme> = IInitStoreParams<EventViewModel, TScheme>;
type FilterType = Filterable<GetEventsFilter>;

type TDeleteEvent = {
  eventId: ResourceIdentifier;
};

const sdk = buildEventSDK();

const buildEventsStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    EventViewModel,
    EventViewModel,
    CreateEventType,
    EventViewModel,
    TDeleteEvent,
    FilterType,
    TScheme,
    'list' | 'single' | 'add' | 'delete'
  >({
    keys: ['list', 'single', 'add', 'delete'],
    ...(params as ParamType<TScheme>),
    scheme,

    loadAll: (filter: FullFilterable<GetEventsFilter>) => {
      return sdk.getEvents({
        ...filter,
      });
    },

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getEvent(id);
    },

    create: (data: CreateEventType) => {
      return sdk.createEvent(data);
    },

    remove: (data: TDeleteEvent) => {
      return sdk.deleteEvent(data.eventId);
    },
  });
};

export default buildEventsStore;
