import { generateCRUD } from '../generateCRUD';
import { buildEventSDK } from 'stores/sdkBuilder/sdkBuilder';

import type {
  LoadAllParams,
  ParamType,
  TCreateEventCatch,
  TDeleteEventCatch,
} from './types';

const sdk = buildEventSDK();

const buildEventCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    null,
    null,
    TCreateEventCatch,
    null,
    TDeleteEventCatch,
    null,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: LoadAllParams) => {
      return sdk.getCatches(filter.eventId, {
        ...filter,
      });
    },

    create: (data: TCreateEventCatch) => {
      return sdk.catch(data.eventId);
    },

    remove: (data: TDeleteEventCatch) => {
      return sdk.uncatch(data.eventId);
    },
  });
};

export default buildEventCatchesStore;
